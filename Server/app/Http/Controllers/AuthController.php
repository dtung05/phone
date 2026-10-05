<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterValidation;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function register(RegisterValidation $request)
    {
        $data = $request->only('full_name', 'email', 'password');
        $this->userRepo->create($data);
        return response()->json($data);
    }


    public function login()
    {
        request()->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'required' => "Nhập đầy đủ dữ liệu trước khi gửi",
            'email' => 'Không đúng định dạng email'
        ]);

        $credentials = request(['email', 'password']);
        if (! auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'Tài khoản hoặc mật khẩu sai',
                'type' => "error"
            ], 401);
        }

        $user = auth()->user();

        $accessToken = auth('api')
            ->claims(['token_type' => 'access'])
            ->setTTL(15) // 15 phút
            ->login($user);

        $refreshToken = auth('api')
            ->claims(['token_type' => 'refresh'])
            ->setTTL(20160) // 14 ngày (20160 phút)
            ->login($user);

        return response()->json([
            'message' => "Đăng nhập thành công",
            'type' => 'success',
            'access_token' => $accessToken,
            'token_type' => 'bearer',
            'expires_in' => 15 * 60,
            'user' => [
                'id' => $user->id,
                'name' => $user->full_name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ], 200)->withCookie(
            cookie(
                'refresh_token',
                $refreshToken,
                20160,
                '/',
                null,
                false,
                true,   // HttpOnly = true (Chống XSS)
                false,
                'Lax'
            )
        );
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        return response()->json([
            'id' => $user->id,
            'role' => $user->role,
            'name' => $user->full_name,
            'email' => $user->email,
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            auth()->logout();
        } catch (\Throwable $e) {
            // bỏ qua lỗi nếu token đã hết hạn
        }

        return response()->json([
            'message' => 'Đăng xuất thành công',
            'type' => 'success'
        ])->withoutCookie('refresh_token');
    }

    /**
     * Refresh a token using the HttpOnly refresh token cookie.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        $refreshTokenString = $request->cookie('refresh_token');
        if (!$refreshTokenString) {
            return response()->json([
                'message' => 'Không tìm thấy refresh token trong cookie.',
                'type' => 'error'
            ], 401);
        }
        try {
            // Giải mã và xác thực refresh token
            $tokenObj = new \PHPOpenSourceSaver\JWTAuth\Token($refreshTokenString);
            $payload = auth('api')->manager()->decode($tokenObj);

            // Kiểm tra token_type phải đúng là 'refresh'
            if ($payload->get('token_type') !== 'refresh') {
                return response()->json([
                    'message' => 'Token không hợp lệ cho thao tác làm mới phiên.',
                    'type' => 'error'
                ], 401);
            }

            // Lấy User từ claim sub
            $userId = $payload->get('sub');
            $user = $this->userRepo->find($userId);

            if (!$user) {
                return response()->json([
                    'message' => 'Không tìm thấy thông tin tài khoản.',
                    'type' => 'error'
                ], 401);
            }

            // Cấp ACCESS TOKEN mới (15 phút)
            $newAccessToken = auth('api')
                ->claims(['token_type' => 'access'])
                ->setTTL(15)
                ->login($user);

            // Xoay vòng Refresh Token (Refresh Token Rotation): Cấp mới Refresh Token để tiếp tục chu kỳ an toàn
            $newRefreshToken = auth('api')
                ->claims(['token_type' => 'refresh'])
                ->setTTL(20160)
                ->login($user);

            return response()->json([
                'message' => 'Làm mới token thành công',
                'type' => 'success',
                'access_token' => $newAccessToken,
                'token_type' => 'bearer',
                'expires_in' => 15 * 60,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->full_name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ], 200)->withCookie(
                cookie(
                    'refresh_token',
                    $newRefreshToken,
                    20160,
                    '/',
                    null,
                    false,
                    true,
                    false,
                    'Lax'
                )
            );
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'message' => 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
                'type' => 'error'
            ], 401);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Làm mới phiên thất bại: ' . $e->getMessage(),
                'type' => 'error'
            ], 401);
        }
    }
}
