<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Supplier\SupplierRepoInter;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    protected $supplierRepo;

    public function __construct(SupplierRepoInter $supplierRepo)
    {
        $this->supplierRepo = $supplierRepo;
    }

    /**
     * Danh sách nhà cung cấp (hỗ trợ cả phân trang tìm kiếm và lấy tất cả cho dropdown)
     */
    public function index(Request $request)
    {
        if ($request->boolean('all')) {
            $suppliers = $this->supplierRepo->getAllSuppliers();
            return response()->json($suppliers);
        }

        $filters = [
            'search' => $request->query('search'),
            'sort_by' => $request->query('sort_by', 'id'),
            'sort_order' => $request->query('sort_order', 'desc'),
        ];

        $perPage = (int) $request->query('per_page', 10);
        $suppliers = $this->supplierRepo->getPaginatedSuppliers($filters, $perPage);

        return response()->json($suppliers);
    }

    /**
     * Chi tiết nhà cung cấp
     */
    public function show($id)
    {
        $supplier = $this->supplierRepo->getSupplierDetail($id);

        if (!$supplier) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy thông tin nhà cung cấp #' . $id,
            ], 404);
        }

        return response()->json($supplier);
    }

    /**
     * Tạo nhà cung cấp mới
     */
    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15|regex:/^[0-9+\-\s]+$/',
            'address' => 'required|string|max:255',
        ], [
            'company_name.required' => 'Vui lòng nhập tên công ty / nhà cung cấp.',
            'phone_number.required' => 'Vui lòng nhập số điện thoại liên hệ.',
            'phone_number.regex' => 'Số điện thoại không hợp lệ.',
            'address.required' => 'Vui lòng nhập địa chỉ nhà cung cấp.',
        ]);

        $supplier = $this->supplierRepo->create([
            'company_name' => trim($request->company_name),
            'phone_number' => trim($request->phone_number),
            'address' => trim($request->address),
        ]);

        return response()->json([
            'type' => 'success',
            'message' => 'Thêm nhà cung cấp mới thành công!',
            'data' => $supplier,
        ], 201);
    }

    /**
     * Cập nhật thông tin nhà cung cấp
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15|regex:/^[0-9+\-\s]+$/',
            'address' => 'required|string|max:255',
        ], [
            'company_name.required' => 'Vui lòng nhập tên công ty / nhà cung cấp.',
            'phone_number.required' => 'Vui lòng nhập số điện thoại liên hệ.',
            'phone_number.regex' => 'Số điện thoại không hợp lệ.',
            'address.required' => 'Vui lòng nhập địa chỉ nhà cung cấp.',
        ]);

        $supplier = $this->supplierRepo->update($id, [
            'company_name' => trim($request->company_name),
            'phone_number' => trim($request->phone_number),
            'address' => trim($request->address),
        ]);

        if (!$supplier) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy nhà cung cấp để cập nhật.',
            ], 404);
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Cập nhật thông tin nhà cung cấp thành công!',
            'data' => $supplier,
        ]);
    }

    /**
     * Xóa nhà cung cấp (kiểm tra ràng buộc chứng từ phiếu nhập)
     */
    public function destroy($id)
    {
        $result = $this->supplierRepo->deleteSupplierSafe($id);

        if (!$result['success']) {
            return response()->json([
                'type' => 'error',
                'message' => $result['message'],
            ], $result['code']);
        }

        return response()->json([
            'type' => 'success',
            'message' => $result['message'],
        ]);
    }
}
