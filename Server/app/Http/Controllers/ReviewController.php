<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index(Product $product)
    {
        return $product->reviews()->with('user:id,full_name')->paginate(5);
    }
    public function store(Request $request)
    {

        $userId = auth()->user()->id;
        $request->validate([
            'productId' => 'required|exists:products,id',
            'rating' => 'required|integer|between:1,5',
            'content' => 'required'
        ]);
        try {
            $review = Review::create([
                'user_id' => $userId,
                'product_id' => $request->productId,
                'rating' => $request->rating,
                'content' => $request->content,
            ]);

            return response()->json([
                'message' => "Gửi đánh giá thành công",
                'type' => true,
            ], 201);
        } catch (\Exception $err) {
            return response()->json([
                'message' => "Lỗi server",
                'type' => false,
            ], 500);
        }
    }
    public function destroy($id)
    {

        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json([
            'message' => "Xóa thành công bình luận",
            'type' => true,
        ]);
    }
}
