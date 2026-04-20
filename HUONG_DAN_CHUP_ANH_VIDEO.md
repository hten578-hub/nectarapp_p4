# 📸 HƯỚNG DẪN CHỤP ẢNH VÀ QUAY VIDEO DEMO

## 🎯 Yêu cầu tổng quan

### 1. Ảnh màn hình (9 ảnh bắt buộc)
- ✅ Đặt tên theo format: `MSSV_01_login.png`, `MSSV_02_autologin.png`, ...
- ✅ Chụp rõ ràng, đầy đủ màn hình
- ✅ Có thể chụp từ emulator hoặc thiết bị thật

### 2. Video demo (2-5 phút)
- ✅ Quay rõ màn hình + thao tác tay
- ✅ Thực hiện đầy đủ flow: Login → Kill app → Mở lại → Cart → Checkout
- ✅ Hiển thị tên sinh viên/MSSV trong app
- ✅ Nói hoặc text overlay: "Đây là bài của em [Tên] - MSSV: [MSSV]"

---

## 📸 CHI TIẾT 9 ẢNH CẦN CHỤP

### Ảnh 1: `MSSV_01_login.png` - Login thành công

**Cách thực hiện:**
1. Mở app lần đầu
2. Đi qua các màn hình: Splash → Onboarding → SignIn → ... → Login
3. Nhập email: `test@example.com`
4. Nhập password: `123456`
5. Nhấn nút "Log In"
6. **Chụp màn hình khi hiển thị Home screen (đã login thành công)**

**Nội dung ảnh:**
- ✅ Màn hình Home với danh sách sản phẩm
- ✅ Bottom navigation bar hiển thị
- ✅ Có thể thấy user đã login (ví dụ: avatar, tên user ở góc)

---

### Ảnh 2: `MSSV_02_autologin.png` - Auto-login sau khi tắt app

**Cách thực hiện:**
1. Sau khi login thành công (ảnh 1)
2. **Tắt app hoàn toàn** (swipe away từ recent apps)
3. **Mở lại app**
4. **Chụp màn hình khi app tự động vào Home screen (không cần login lại)**

**Nội dung ảnh:**
- ✅ Màn hình Home (giống ảnh 1)
- ✅ Không hiển thị màn hình Login
- ✅ Chứng minh auto-login hoạt động

**Lưu ý:**
- Có thể chụp thêm ảnh console log để chứng minh: `"Auto-login successful"`

---

### Ảnh 3: `MSSV_03_logout.png` - Logout quay về login screen

**Cách thực hiện:**
1. Từ Home screen, nhấn tab "Account" (👤)
2. Scroll xuống dưới cùng
3. Nhấn nút "Log Out"
4. **Chụp màn hình Login screen (đã logout thành công)**

**Nội dung ảnh:**
- ✅ Màn hình Login với form email/password
- ✅ Hoặc màn hình Onboarding (tùy flow của bạn)
- ✅ Chứng minh đã logout và quay về màn hình đăng nhập

---

### Ảnh 4: `MSSV_04_add_cart.png` - Thêm sản phẩm vào giỏ

**Cách thực hiện:**
1. Login lại (nếu đã logout)
2. Từ Home screen, nhấn vào 1 sản phẩm (ví dụ: "Organic Bananas")
3. Trong Product Detail, nhấn nút "Add To Basket"
4. **Chụp màn hình khi hiển thị thông báo "Added to cart" hoặc giỏ hàng có badge số lượng**

**Nội dung ảnh:**
- ✅ Màn hình Product Detail với nút "Add To Basket"
- ✅ Hoặc màn hình Home với badge giỏ hàng (🛒 1)
- ✅ Chứng minh đã thêm sản phẩm vào giỏ

**Hoặc:**
- Chụp màn hình Cart với 1 sản phẩm vừa thêm

---

### Ảnh 5: `MSSV_05_cart_reload.png` - Giỏ hàng vẫn còn sau khi tắt app

**Cách thực hiện:**
1. Sau khi thêm sản phẩm vào giỏ (ảnh 4)
2. **Tắt app hoàn toàn** (swipe away)
3. **Mở lại app**
4. Nhấn tab "Cart" (🛒)
5. **Chụp màn hình Cart vẫn còn sản phẩm**

**Nội dung ảnh:**
- ✅ Màn hình Cart với sản phẩm đã thêm trước đó
- ✅ Số lượng, giá tiền hiển thị đúng
- ✅ Chứng minh giỏ hàng persistent (không mất khi tắt app)

---

### Ảnh 6: `MSSV_06_quantity.png` - Thay đổi số lượng

**Cách thực hiện:**
1. Trong màn hình Cart
2. Nhấn nút "+" để tăng số lượng (ví dụ: từ 1 → 2)
3. **Chụp màn hình khi số lượng đã thay đổi**

**Nội dung ảnh:**
- ✅ Màn hình Cart với số lượng đã tăng (ví dụ: 2)
- ✅ Giá tiền tổng cũng thay đổi (ví dụ: $4.99 → $9.98)
- ✅ Nút "-" và "+" hiển thị rõ ràng

**Bonus:**
- Có thể chụp thêm ảnh khi nhấn nút "-" để giảm số lượng

---

### Ảnh 7: `MSSV_07_checkout.png` - Checkout thành công

**Cách thực hiện:**
1. Trong màn hình Cart (có sản phẩm)
2. Nhấn nút "Go to Checkout"
3. **Chụp màn hình khi hiển thị thông báo "Đặt hàng thành công"**

**Nội dung ảnh:**
- ✅ Alert/Modal hiển thị: "🎉 Đặt hàng thành công!"
- ✅ Tổng tiền đơn hàng
- ✅ Nút "Xem đơn hàng" hoặc "OK"

**Hoặc:**
- Chụp màn hình Cart trống (sau khi checkout, giỏ hàng bị clear)

---

### Ảnh 8: `MSSV_08_orders.png` - Danh sách đơn hàng

**Cách thực hiện:**
1. Sau khi checkout thành công (ảnh 7)
2. Nhấn tab "Account" (👤)
3. Nhấn vào "Orders" trong menu
4. **Chụp màn hình Orders screen với đơn hàng vừa đặt**

**Nội dung ảnh:**
- ✅ Màn hình Orders với danh sách đơn hàng
- ✅ Mỗi đơn hiển thị: ID, sản phẩm, tổng tiền, thời gian
- ✅ Ít nhất 1 đơn hàng hiển thị

---

### Ảnh 9: `MSSV_09_orders_reload.png` - Đơn hàng vẫn còn sau khi reload

**Cách thực hiện:**
1. Sau khi xem Orders (ảnh 8)
2. **Tắt app hoàn toàn** (swipe away)
3. **Mở lại app**
4. Nhấn tab "Account" → "Orders"
5. **Chụp màn hình Orders vẫn còn đơn hàng**

**Nội dung ảnh:**
- ✅ Màn hình Orders với đơn hàng vẫn còn (giống ảnh 8)
- ✅ Chứng minh đơn hàng persistent (không mất khi tắt app)

---

## 🎥 HƯỚNG DẪN QUAY VIDEO DEMO

### Thời lượng: 2-5 phút

### Nội dung video phải có:

#### 1. **Giới thiệu (10-15 giây)**
```
"Xin chào, em là [Tên], MSSV: [MSSV]
Đây là bài tập AsyncStorage của em
Em sẽ demo các chức năng của app Nectar"
```

#### 2. **Demo Login + Auto-login (30-45 giây)**
- Mở app lần đầu
- Đi qua Splash → Onboarding → Login
- Nhập email/password → Login
- **Tắt app (swipe away)**
- **Mở lại app → Tự động login (không cần nhập lại)**
- Nói: "Như các bạn thấy, app tự động login mà không cần nhập lại"

#### 3. **Demo Cart Persistence (45-60 giây)**
- Thêm 2-3 sản phẩm vào giỏ
- Tăng/giảm số lượng
- Nói: "Bây giờ em sẽ tắt app để kiểm tra giỏ hàng có còn không"
- **Tắt app**
- **Mở lại app**
- Vào Cart → Giỏ hàng vẫn còn
- Nói: "Giỏ hàng vẫn còn đầy đủ sau khi tắt app"

#### 4. **Demo Checkout + Orders (45-60 giây)**
- Nhấn "Go to Checkout"
- Hiển thị thông báo "Đặt hàng thành công"
- Vào Account → Orders
- Xem đơn hàng vừa đặt
- Nói: "Đơn hàng đã được lưu vào AsyncStorage"
- **Tắt app**
- **Mở lại app**
- Vào Orders → Đơn hàng vẫn còn
- Nói: "Đơn hàng vẫn còn sau khi reload app"

#### 5. **Demo Logout (15-20 giây)**
- Vào Account
- Nhấn "Log Out"
- Quay về màn hình Login
- Nói: "Logout đã xóa toàn bộ dữ liệu user khỏi AsyncStorage"

#### 6. **Kết thúc (10 giây)**
```
"Vậy là em đã demo xong các chức năng AsyncStorage
Cảm ơn các bạn đã xem!"
```

### Tips quay video:

#### Nếu quay trên emulator:
- ✅ Sử dụng OBS Studio hoặc screen recorder
- ✅ Quay cả màn hình emulator
- ✅ Có thể thêm webcam ở góc (optional)

#### Nếu quay trên thiết bị thật:
- ✅ Dùng điện thoại khác quay lại
- ✅ Hoặc dùng screen recorder trên điện thoại
- ✅ Đảm bảo quay rõ màn hình và thao tác tay

#### Chỉnh sửa video:
- ✅ Thêm text overlay: "Tên - MSSV" ở góc màn hình
- ✅ Thêm mũi tên chỉ vào các thao tác quan trọng
- ✅ Tăng tốc độ video ở phần chờ đợi (loading)
- ✅ Thêm nhạc nền nhẹ nhàng (optional)

---

## 📁 CẤU TRÚC THỨ MỤC ẢNH

Tạo folder `screenshots` trong project:

```
nectar-app/
├── screenshots/
│   ├── MSSV_01_login.png
│   ├── MSSV_02_autologin.png
│   ├── MSSV_03_logout.png
│   ├── MSSV_04_add_cart.png
│   ├── MSSV_05_cart_reload.png
│   ├── MSSV_06_quantity.png
│   ├── MSSV_07_checkout.png
│   ├── MSSV_08_orders.png
│   └── MSSV_09_orders_reload.png
├── video/
│   └── MSSV_demo.mp4
└── README.md
```

---

## 🔧 CÁCH CHỤP ẢNH

### Trên Android Emulator:
```bash
# Cách 1: Dùng nút camera trong emulator
# Cách 2: Dùng ADB
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Cách 3: Dùng phím tắt
# Windows: Ctrl + S (trong emulator)
```

### Trên iOS Simulator:
```bash
# Cách 1: Dùng menu
# File → New Screen Shot (Cmd + S)

# Cách 2: Dùng xcrun
xcrun simctl io booted screenshot screenshot.png
```

### Trên thiết bị thật:
- **Android**: Power + Volume Down
- **iOS**: Power + Volume Up

---

## ✅ CHECKLIST TRƯỚC KHI NỘP

### Ảnh:
- [ ] Đủ 9 ảnh
- [ ] Đặt tên đúng format: `MSSV_XX_description.png`
- [ ] Ảnh rõ ràng, không bị mờ
- [ ] Ảnh chụp đầy đủ màn hình (không bị cắt)

### Video:
- [ ] Thời lượng 2-5 phút
- [ ] Có giới thiệu tên + MSSV
- [ ] Demo đầy đủ: Login → Kill app → Cart → Checkout → Orders
- [ ] Quay rõ màn hình và thao tác
- [ ] Có âm thanh (nói hoặc text overlay)

### GitHub:
- [ ] Đã push code lên GitHub
- [ ] Có ít nhất 5 commits với message có ý nghĩa
- [ ] README.md đầy đủ thông tin
- [ ] Có folder screenshots với 9 ảnh

### Tài liệu:
- [ ] Đã trả lời 3 câu hỏi lý thuyết
- [ ] Giải thích rõ ràng, có ví dụ code

---

## 🎯 MẸO ĐỂ ĐẠT ĐIỂM CAO

1. **Ảnh đẹp, chuyên nghiệp:**
   - Chụp trên emulator (rõ hơn thiết bị thật)
   - Crop ảnh cho gọn gàng
   - Đặt tên file rõ ràng

2. **Video mượt mà:**
   - Luyện tập trước khi quay
   - Nói rõ ràng, tự tin
   - Thêm text overlay để dễ hiểu

3. **Code sạch đẹp:**
   - Format code đẹp
   - Có comment giải thích
   - Commit message có ý nghĩa

4. **Tài liệu chi tiết:**
   - README.md đầy đủ
   - Trả lời 3 câu hỏi có chiều sâu
   - Có ví dụ code minh họa

5. **Bonus features:**
   - Thêm encryption
   - Tạo custom hook useStorage
   - Loading states đẹp

---

**Chúc bạn làm bài tốt! 🚀**
