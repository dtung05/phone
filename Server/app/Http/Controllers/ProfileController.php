<?php

namespace App\Http\Controllers;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    // lấy thông tin người dùng
    public function getProfile()
    {
        $profile = $this->userRepo->getUserProfile(auth()->id());
        if (!$profile) {
            return response()->json([
                'message' => 'Không tìm thấy thông tin người dùng.',
                'type' => 'error'
            ], 404);
        }
        return response()->json($profile);
    }

    // cập nhật thông tin
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'phone_number' => 'nullable|string|regex:/^[0-9]{10,12}$/',
            'address' => 'nullable|string|max:255',
        ], [
            'full_name.required' => 'Họ và tên không được để trống.',
            'phone_number.regex' => 'Số điện thoại phải từ 10 đến 12 chữ số.',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
        ]);
        $this->userRepo->updateUserProfile(auth()->id(), $validated);
        return response()->json([
            'type' => 'success',
            'message' => 'Cập nhật thông tin cá nhân thành công!',
        ]);
    }

    /**
     * Đổi mật khẩu
     */
    public function changePassword(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ], [
            'current_password.required' => 'Vui lòng nhập mật khẩu hiện tại.',
            'new_password.required' => 'Vui lòng nhập mật khẩu mới.',
            'new_password.min' => 'Mật khẩu mới phải có ít nhất 6 ký tự.',
            'new_password.confirmed' => 'Xác nhận mật khẩu mới không khớp.',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'type' => 'error',
                'message' => 'Mật khẩu hiện tại không chính xác.',
            ], 422);
        }

        if (Hash::check($request->new_password, $user->password)) {
            return response()->json([
                'type' => 'error',
                'message' => 'Mật khẩu mới không được trùng với mật khẩu hiện tại.',
            ], 422);
        }
        $this->userRepo->update($user->id, [
            'password' => Hash::make($request->new_password),
        ]);
        return response()->json([
            'type' => 'success',
            'message' => 'Đổi mật khẩu thành công!',
        ]);
    }
}
