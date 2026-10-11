# Hệ thống Website Bán Điện Thoại Trực Tuyến & Quản Lý Hàng Tồn Kho

> Xây dựng theo kiến trúc Decoupled: **Laravel 12 (RESTful API)** + **React**.

## MỤC LỤC

1. [Giới Thiệu Dự Án](#-giới-thiệu-dự-án)
2. [Điểm Nổi Bật Về Kỹ Thuật & Kiến Trúc](#-điểm-nổi-bật-về-kỹ-thuật--kiến-trúc)
3. [Công Nghệ Sử Dụng ](#-công-nghệ-sử-dụng-tech-stack)
4. [Yêu Cầu Môi Trường ](#-yêu-cầu-môi-trường-prerequisites)
5. [Hướng Dẫn Cài Đặt & Chạy Dự Án ](#-hướng-dẫn-cài-đặt--chạy-dự-án)
6. [Tài Khoản Mẫu Trải Nghiệm Hệ Thống](#-tài-khoản-mẫu-trải-nghiệm-hệ-thống)

---

## GIỚI THIỆU DỰ ÁN

Dự án là nền tảng thương mại điện tử chuyên sâu cho ngành bán lẻ thiết bị di động kết hợp hệ thống ERP thu nhỏ quản lý kho hàng:

- **Phía khách hàng:** Xem sản phẩm theo biến thể (màu sắc, dung lượng bộ nhớ), tìm kiếm & lọc nâng cao, giỏ hàng, đặt hàng, thanh toán trực tuyến qua cổng VNPay, tra cứu và đánh giá sản phẩm.
- **Phía nhân viên hệ thống (Chủ cửa hàng, Nhân viên kho, Nhân viên sale) :** Quản lý sản phẩm biến thể, danh mục, thương hiệu, nhà cung cấp, lập phiếu nhập kho từ nhà cung cấp để tăng tồn kho, quản lý đơn hàng, trả lời đánh giá sản phẩm, và dashboard thống kê doanh thu biểu đồ trực quan.

---

## ĐIỂM NỔI BẬT VỀ KỸ THUẬT & KIẾN TRÚC

Dự án được xây dựng áp dụng nhiều giải pháp giải quyết bài toán thực tế:

1. **Tách tầng Repository và Service cho các nghiệp vụ nặng:**
   - **Repository Pattern & BaseRepository:** Tách biệt hoàn toàn tầng truy xuất dữ liệu khỏi Business Logic.
   - **Service Layer:** Đóng gói toàn bộ logic nghiệp vụ phức tạp vào Services, Controller chỉ làm nhiệm vụ nhận request và điều phối service.
2. **Factory Method Pattern & Polymorphism:**
   - Triển khai `PaymentFactory` + `PaymentInterface` cho module thanh toán. Dễ dàng mở rộng thêm MoMo, ZaloPay mà không cần sửa code cũ..
3. **Giải Quyết Bài Toán Tranh Chấp:**
   - Áp dụng `lockForUpdate()` kết hợp `Database Transaction`khi trừ tồn kho lúc đặt hàng, ngăn chặn hoàn toàn việc bán âm kho khi có nhiều người cùng mua tại một thời điểm.
4. **Giao Tiếp Thời Gian Thực:**
   - Sử dụng **Laravel Reverb** kết hợp **Laravel Echo** phía React. Khi có đơn hàng mới, hệ thống tự động bắn thông báo realtime cho ban quản trị mà không cần reload trang.
5. **Tích Hợp Cổng Thanh Toán Trực Tuyến VNPay:**
   - Giúp người dùng có thể thực hiện thanh toán online trên hệ thống
6. **Tối Ưu Hiệu Năng Truy Vấn:**
   - Sử dụng Laravel Cache lưu vào file cho table brand và category, tự động làm mới dữ liệu cache khi nhân viên thực hiện thêm, sửa, xóa.
   - Rate Limit giới hạn toàn bộ api `80 Request/1 Phút`, riêng api login `3 Request/5 Phút`

---

## CÔNG NGHỆ SỬ DỤNG

### Backend

- **Framework:** Laravel 12
- **Database:** MySQL
- **Authentication:** JWT Auth ( jwt auth )
- **Realtime WebSocket:** Laravel Reverb
- **Payment Gateway:** VNPay Sandbox
- **Kiến trúc:** Repository Pattern, Service Layer, Factory Pattern.

### Frontend

- **Framework & Tooling:** React, Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling & UI:** Tailwind , Lucide React Icons
- **Form Management:** React Hook Form
- **Data Visualization:** Recharts
- **Realtime Client:** Laravel Echo, Pusher-js

---

## YÊU CẦU MÔI TRƯỜNG

Trước khi cài đặt, hãy đảm bảo máy tính của bạn đã cài sẵn:

- **PHP:** phiên bản >= 8.3
- **Composer:** phiên bản mới nhất.
- **Node.js:** phiên bản 18.x hoặc 20.x+ (kèm npm).
- **XAMPP::** để chạy MySQL.

---

# Hướng dẫn cài đặt và chạy dự án

## 1. Khởi động MySQL và tạo Database

- Mở XAMPP Control Panel và khởi động MySQL.
- Truy cập [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
- Tạo database có tên `web-phone`.

## 2. Cài đặt Backend

Mở terminal tại thư mục gốc của dự án và chạy:

```bash
cd Server
composer install
```

### Cấu hình môi trường

Nếu chưa có file `.env`, tạo file từ `.env.example`:

```bash
copy .env.example .env
```

Mở file `Server/.env` và kiểm tra các thông số sau:

```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=web-phone
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_CONNECTION=reverb
REVERB_APP_ID=271295
REVERB_APP_KEY=brxbyvwk5tegqzjdn66u
REVERB_APP_SECRET=f8udhsn6gflxtpoefrq1
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http
```

### Khởi tạo ứng dụng

Chạy các lệnh sau trong thư mục `Server`:

```bash
php artisan key:generate
php artisan jwt:secret
php artisan storage:link
```

Tạo các bảng trong database và nạp dữ liệu mẫu:

```bash
php artisan migrate:fresh --seed
```

Lệnh trên sẽ tạo lại toàn bộ bảng và nạp dữ liệu mẫu cho dự án. Nếu database đã có dữ liệu cần giữ lại, không nên chạy lệnh này.

## 3. Cài đặt Frontend

Mở terminal mới và chuyển vào thư mục `client`:
**Lưu ý nếu sử dụng tẻmina trong vscode:** `thêm cmd.` vào trước lệnh khi chạy
`VD: npm.cdm run dev`

```bash
cd client
npm install
```

Kiểm tra file `client/.env` và cấu hình các biến môi trường:

```env
VITE_BASE_URL=http://localhost:8000/api/
VITE_URL_IMG=http://localhost:8000/storage/
VITE_REVERB_APP_KEY=brxbyvwk5tegqzjdn66u
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

## 4. Khởi chạy dự án

Sau khi cài đặt xong, mở 3 terminal riêng để chạy Backend, Reverb và Frontend.

**Terminal 1 – Backend API**

Tại thư mục `Server`, chạy:

```bash
php artisan serve
```

API sẽ chạy tại `http://localhost:8000`.

**Terminal 2 – WebSocket Server**

Tại thư mục `Server`, chạy:

```bash
php artisan reverb:start
```

Reverb sử dụng cổng `8080` để phục vụ kết nối WebSocket.

**Terminal 3 – Frontend**

Tại thư mục `client`, chạy:

```bash
npm run dev
```

Giao diện sẽ chạy tại `http://localhost:5173`.

Sau khi cả 3 tiến trình hoạt động, bạn có thể truy cập địa chỉ frontend để sử dụng dự án.

## Tài khoản mẫu

Sau khi chạy lệnh `php artisan migrate:fresh --seed`, bạn có thể sử dụng các tài khoản dưới đây để trải nghiệm hệ thống theo từng vai trò.

| Vai trò            | Email             | Mật khẩu    |
| ------------------ | ----------------- | ----------- |
| Quản trị viên      | `admin@gmail.com` | `ductung05` |
| Nhân viên kho      | `kho@gmail.com`   | `ductung05` |
| Nhân viên bán hàng | `sale@gmail.com`  | `ductung05` |
| Khách hàng         | `khach@gmail.com` | `ductung05` |

**Quyền hạn của từng vai trò:**

- **Quản trị viên:** Quản lý hệ thống, theo dõi thống kê và quản lý sản phẩm, danh mục, đơn hàng.
- **Nhân viên kho:** Quản lý nhà cung cấp, phiếu nhập kho và theo dõi tồn kho sản phẩm.
- **Nhân viên bán hàng:** Xử lý đơn hàng và phản hồi đánh giá của khách hàng, bật tắt sale, thêm các quảng cáo cho trang web.
- **Khách hàng:** Mua sắm, quản lý giỏ hàng, đơn hàng, thông tin cá nhân, đặt hàng, thanh toán VNPay và đánh giá sản phẩm.
