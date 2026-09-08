<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCreateValidation extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        if (is_string($this->variants)) {
            $decoded = json_decode($this->variants, true);
            if (is_array($decoded)) {
                $this->merge(['variants_array' => $decoded]);
            }
        }
    }

    public function rules(): array
    {
        return [
            'product_name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'thumbnail' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:5120',
            'images' => 'nullable|array',
            'images.*' => 'file|image|mimes:jpeg,png,jpg,webp|max:5120',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'discount_perventage' => 'nullable|numeric|min:0|max:100',
            'review_video' => 'nullable|string|max:255',
            'specifications' => 'nullable',
            'variants' => 'required',
            'variants_array' => 'required|array|min:1',
            'variants_array.*.selling_price' => 'required|numeric|min:0',
            'variants_array.*.attributes' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'product_name.required' => 'Vui lòng nhập tên sản phẩm.',
            'product_name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
            'brand_id.required' => 'Vui lòng chọn thương hiệu.',
            'brand_id.exists' => 'Thương hiệu được chọn không tồn tại.',
            'category_id.required' => 'Vui lòng chọn danh mục.',
            'category_id.exists' => 'Danh mục được chọn không tồn tại.',
            'thumbnail.required' => 'Vui lòng chọn ảnh đại diện cho sản phẩm.',
            'thumbnail.image' => 'Ảnh đại diện phải là tệp hình ảnh hợp lệ.',
            'thumbnail.mimes' => 'Ảnh đại diện phải có định dạng jpeg, png, jpg hoặc webp.',
            'thumbnail.max' => 'Ảnh đại diện không được vượt quá 5MB.',
            'images.*.image' => 'Mỗi ảnh trong bộ ảnh chi tiết phải là hình ảnh hợp lệ.',
            'images.*.mimes' => 'Ảnh chi tiết phải có định dạng jpeg, png, jpg hoặc webp.',
            'images.*.max' => 'Ảnh chi tiết không được vượt quá 5MB.',
            'discount_percentage.numeric' => 'Phần trăm giảm giá phải là số.',
            'discount_percentage.min' => 'Phần trăm giảm giá không thể nhỏ hơn 0%.',
            'discount_percentage.max' => 'Phần trăm giảm giá không thể lớn hơn 100%.',
            'variants.required' => 'Vui lòng cung cấp ít nhất một biến thể cho sản phẩm.',
            'variants_array.required' => 'Dữ liệu biến thể không hợp lệ.',
            'variants_array.min' => 'Cần có ít nhất một biến thể.',
            'variants_array.*.selling_price.required' => 'Vui lòng nhập giá bán cho biến thể.',
            'variants_array.*.selling_price.numeric' => 'Giá bán của biến thể phải là số.',
            'variants_array.*.selling_price.min' => 'Giá bán của biến thể không thể âm.',
            'variants_array.*.attributes.required' => 'Vui lòng cung cấp thuộc tính cho biến thể.',
        ];
    }
}
