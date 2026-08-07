<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class OrderCreateValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'payment_method' => 'required|in:cod,vnpay,momo',
            'recipient_name' => 'required|min:2',
            'recipient_phone' => [
                'required',
                'regex:/^(0|\+84)[3-9][0-9]{8}$/'
            ],
            'recipient_address' => "required"
        ];
    }

public function messages(): array
{
    return [
        'payment_method.required' => 'Vui lòng chọn phương thức thanh toán.',
        'payment_method.in' => 'Phương thức thanh toán không hợp lệ.',

        'recipient_name.required' => 'Vui lòng nhập tên người nhận.',
        'recipient_name.min' => 'Tên người nhận phải có ít nhất 2 ký tự.',

        'recipient_phone.required' => 'Vui lòng nhập số điện thoại.',
        'recipient_phone.regex' => 'Số điện thoại không đúng định dạng.',

        'recipient_address.required' => 'Vui lòng nhập địa chỉ nhận hàng.',
    ];
}



}
