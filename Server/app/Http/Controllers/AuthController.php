<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterValidation;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;


class AuthController extends Controller
{





    public function register(RegisterValidation $request, UserRepositoryInterface $userRepo)
    {
        $data = $request->validated();
        $data = $request->only('full_name', 'email', 'password');
        $check = $userRepo->create($data);
        return response()->json($data);
    }


    public function login()
    {   
        
        $credentials = request()->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'required' => "Nhập đầy đủ dữ liệu trước khi gửi",
            'email' => 'Không đúng định dạng email'
        ]);

        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Tài khoản hoặc mật khẩu sai'], 401);
        }
        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'message' => "Đăng nhập thành công",
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ], 200);
    }
}
