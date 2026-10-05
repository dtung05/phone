<?php

namespace App\Http\Controllers;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }


    public function index(Request $request)
    {
        $filters = $request->only(['search', 'role', 'status']);
        $users = $this->userRepo->getStaffUsers($filters);
        return response()->json($users);
    }

    // Xem chi tiết tài khoản (Admin)
    public function show(string $id)
    {
        $user = $this->userRepo->getStaffUserDetail((int) $id);
        if (!$user) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy tài khoản.',
            ], 404);
        }

        return response()->json($user);
    }

    // tạo tài khoản nhân viên mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:Khách hàng,Nhân viên sale,Nhân viên kho,Quản trị viên',
        ], [
            'full_name.required' => 'Họ và tên không được để trống.',
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email này đã tồn tại trên hệ thống.',
            'password.required' => 'Mật khẩu không được để trống.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'role.in' => 'Vai trò không hợp lệ.',
        ]);
        $validated['password'] = Hash::make($validated['password']);
        $validated['status'] = 'Active';
        $user = $this->userRepo->create($validated);
        return response()->json([
            'type' => 'success',
            'message' => 'Tạo tài khoản thành công!',
            'data' => $user,
        ], 201);
    }

    // Cập nhật vai trò người dùng
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'role' => 'required|in:Khách hàng,Nhân viên sale,Nhân viên kho,Quản trị viên',
        ], [
            'role.required' => 'Vui lòng chọn vai trò.',
            'role.in' => 'Vai trò không hợp lệ.',
        ]);
        $user = $this->userRepo->update((int) $id, ['role' => $validated['role']]);
        if (!$user) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy tài khoản.',
            ], 404);
        }
        return response()->json([
            'type' => 'success',
            'message' => 'Cập nhật tài khoản thành công!',
            'data' => $user,
        ]);
    }

    // khóa mở tài khoản nhanh
    public function toggleStatus(string $id)
    {
        $targetId = (int) $id;
        if ($targetId === auth()->id()) {
            return response()->json([
                'type' => 'error',
                'message' => 'Bạn không thể tự thao tác trên tài khoản của chính mình.',
            ], 400);
        }
        $user = $this->userRepo->find($targetId);
        if (!$user) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy tài khoản.',
            ], 404);
        }
        // lấy ra trạng thái mới
        $newStatus = ($user->status === 'Active') ? 'Locked' : 'Active';
        $user = $this->userRepo->update($targetId, ['status' => $newStatus]);
        $actionText = ($newStatus === 'Active') ? 'Mở khóa' : 'Khóa';
        return response()->json([
            'type' => 'success',
            'message' => "{$actionText} tài khoản thành công!",
            'data' => $user,
        ]);
    }
}
