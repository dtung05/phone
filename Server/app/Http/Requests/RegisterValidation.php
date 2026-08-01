<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Cho phép mở validator
    }


    public function rules(): array
    {
        return [
            'full_name' => 'min:10|required',
            'email' => 'email|required|unique:users,email',
            'password' => 'min:8|required',
            'confirm_password' => 'min:8|required|same:password',
        ];
    }
    public function messages(): array
    {
        return [
            'full_name.required' => 'Vui lòng nhập họ và tên.',
            'full_name.min' => 'Họ và tên phải có ít nhất 10 ký tự.',
            "unique" => "Email đã tồn tại, vui lòng nhập emai khác",
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không đúng định dạng.',

            'password.required' => 'Vui lòng nhập mật khẩu.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',

            'confirm_password.required' => 'Vui lòng xác nhận mật khẩu.',
            'confirm_password.min' => 'Mật khẩu xác nhận phải có ít nhất 8 ký tự.',
            'confirm_password.same' => 'Mật khẩu xác nhận không khớp.',
        ];
    }
}
