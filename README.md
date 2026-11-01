# Hệ Thống Website Bán Điện Thoại Trực Tuyến & Quản Lý Hàng Tồn Kho

>Laravel 12 RESTful API + React

## MỤC LỤC
1. [Giới Thiệu Dự Án](#1-giới-thiệu-dự-án)
2. [Điểm Nổi Bật Về Kỹ Thuật & Kiến Trúc](#2-điểm-nổi-bật-về-kỹ-thuật--kiến-trúc)
3. [Công Nghệ Sử Dụng ](#3-công-nghệ-sử-dụng-tech-stack)
4. [Hướng Dẫn Cài Đặt ](#4-hướng-dẫn-cài-đặt-dev-environment)
5. [Tài Khoản Mẫu Trải Nghiệm Hệ Thống](#5-tài-khoản-mẫu-trải-nghiệm-hệ-thống)


## 1. GIỚI THIỆU DỰ ÁN

Dự án là nền tảng thương mại điện tử chuyên sâu dành cho ngành bán lẻ thiết bị di động, tích hợp hệ thống ERP thu nhỏ nhằm tối ưu hóa quy trình quản lý kho hàng và bán hàng:

- **Phía Khách Hàng :**
  - Trải nghiệm mua sắm mượt mà với sản phẩm phân chia theo biến thể (màu sắc, dung lượng bộ nhớ).
  - Tính năng tìm kiếm và lọc nâng cao, quản lý giỏ hàng, đặt hàng nhanh chóng.
  - Thanh toán trực tuyến an toàn qua cổng VNPay, tra cứu lịch sử đơn hàng và đánh giá sản phẩm.
- **Phía Quản Trị Hệ Thống:**
  - **Quản lý sản phẩm & danh mục:** Quản lý sản phẩm biến thể, danh mục, thương hiệu, nhà cung cấp.
  - **Quản lý kho:** Lập và theo dõi phiếu nhập kho từ nhà cung cấp để cập nhật tồn kho chính xác.
  - **Vận hành & Chăm sóc khách hàng:** Quản lý đơn hàng, phản hồi đánh giá sản phẩm, cấu hình chương trình giảm giá và banner quảng cáo.
  - **Thống kê & Báo cáo:** Dashboard trực quan hiển thị biểu đồ thống kê doanh thu theo thời gian thực.


## 2. ĐIỂM NỔI BẬT VỀ KỸ THUẬT & KIẾN TRÚC

Hệ thống được thiết kế và xây dựng nhằm giải quyết các bài toán thực tế trong lập trình web hiện đại:

1. **Tầng Repository & Service Pattern:**
   - **Repository Pattern & BaseRepository:** Tách biệt hoàn toàn tầng truy xuất dữ liệu khỏi Business Logic, giúp code dễ bảo trì và mở rộng.
   - **Service Layer:** Đóng gói toàn bộ logic nghiệp vụ phức tạp. Controller chỉ đóng vai trò tiếp nhận request và điều phối service.
2. **Factory Method Pattern & Polymorphism:**
   - Ứng dụng `PaymentFactory` kết hợp `PaymentInterface` cho module thanh toán, cho phép dễ dàng mở rộng thêm các cổng thanh toán khác (MoMo, ZaloPay,...) mà không ảnh hưởng đến mã nguồn cũ.
3. **Xử Lý Tranh Chấp Dữ Liệu:**
   - Áp dụng `lockForUpdate()` kết hợp với `Database Transaction` khi trừ tồn kho lúc đặt hàng, ngăn chặn triệt để tình trạng bán âm kho khi có lượng lớn người dùng cùng mua một sản phẩm tại cùng thời điểm.
4. **Giao Tiếp Thời Gian Thực:**
   - Tích hợp **Laravel Reverb** kết hợp **Laravel Echo** ở phía React. Hệ thống tự động đẩy thông báo đơn hàng mới về cho ban quản trị ngay lập tức mà không cần tải lại trang.
5. **Tích Hợp Cổng Thanh Toán VNPay:**
   - Hỗ trợ người dùng thanh toán trực tuyến nhanh chóng, an toàn thông qua cổng thanh toán VNPay Sandbox.
6. **Tối Ưu Hiệu Năng & Bảo Mật:**
   - **Caching:** Sử dụng Laravel Cache để lưu trữ dữ liệu danh mục (Category) và thương hiệu (Brand), tự động làm mới cache khi có thao tác Thêm/Sửa/Xóa.
   - **Rate Limiting:** Giới hạn tần suất gọi API toàn hệ thống ở mức `80 Request/1 Phút`, riêng API đăng nhập giới hạn chặt chẽ `3 Request/5 Phút` nhằm phòng chống tấn công.

## 3. CÔNG NGHỆ SỬ DỤNG
### Backend
- **Framework:** Laravel 12 (RESTful API)
- **Database:** MySQL
- **Authentication:** JWT Auth
- **Realtime WebSocket:** Laravel Reverb
- **Payment Gateway:** VNPay Sandbox
- **Kiến trúc:** Repository Pattern, Service Layer, Factory Pattern
### Frontend
- **Framework & Tooling:** React, Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling & UI:** Tailwind CSS, Lucide React Icons
- **Form Management:** React Hook Form
- **Data Visualization:** Recharts
- **Realtime Client:** Laravel Echo, Pusher-js

## 4. HƯỚNG DẪN CÀI ĐẶT (DEV ENVIRONMENT)

_Yêu cầu hệ thống: Đã cài đặt sẵn Docker._

- [Hướng dẫn cài đặt Docker cho Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- [Hướng dẫn cài đặt Docker cho Linux](https://docs.docker.com/desktop/setup/install/linux/)
- [Hướng dẫn cài đặt Docker cho Mac](https://docs.docker.com/desktop/setup/install/mac-install/)

### Các câu lệnh quản lý hệ thống:

```bash
# 1. Khởi động toàn bộ hệ thống 
docker compose up -d --build

# 2. Tạo symbolic link cho storage 
docker compose exec app php artisan storage:link

# 3. Chạy migration và seed dữ liệu mẫu cho MySQL 
docker compose exec app php artisan migrate --seed

# 4. Xem logs khi cần debug hệ thống
docker compose logs -f

# 5. Dừng hệ thống
docker compose down
```


## 5. TÀI KHOẢN MẪU TRẢI NGHIỆM HỆ THỐNG
Sau khi chạy lệnh khởi tạo dữ liệu (`migrate:fresh --seed`), bạn có thể sử dụng các tài khoản dưới đây để đăng nhập và trải nghiệm các phân quyền khác nhau:

| Vai trò                        | Email đăng nhập   | Mật khẩu    |
| :----------------------------- | :---------------- | :---------- |
| **Quản trị viên (Admin)**      | `admin@gmail.com` | `ductung05` |
| **Nhân viên kho (Warehouse)**  | `kho@gmail.com`   | `ductung05` |
| **Nhân viên bán hàng (Sales)** | `sale@gmail.com`  | `ductung05` |
| **Khách hàng (Customer)**      | `khach@gmail.com` | `ductung05` |

### Phân quyền chi tiết:
- **Quản trị viên:** Quản lý toàn bộ hệ thống, theo dõi thống kê doanh thu, quản lý sản phẩm, danh mục và đơn hàng.
- **Nhân viên kho:** Quản lý nhà cung cấp, lập phiếu nhập kho và theo dõi biến động tồn kho sản phẩm.
- **Nhân viên bán hàng:** Xử lý đơn hàng, phản hồi đánh giá của khách hàng, quản lý chương trình khuyến mãi và banner quảng cáo.
- **Khách hàng:** Mua sắm, quản lý giỏ hàng, theo dõi đơn hàng, cập nhật thông tin cá nhân, thanh toán qua VNPay và viết đánh giá sản phẩm.
