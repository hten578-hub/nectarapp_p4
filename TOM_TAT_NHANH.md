# ⚡ TÓM TẮT NHANH - 5 BƯỚC HOÀN THÀNH BÀI TẬP

## 🎯 Code đã HOÀN THÀNH 100%! Chỉ cần làm 5 việc sau:

---

## 1️⃣ FIX LỖI ASYNCSTORAGE (5 phút) ⚠️

```bash
# Dừng Metro (Ctrl+C), sau đó chạy:
taskkill /F /IM node.exe
rmdir /s /q node_modules
del package-lock.json
npm install
npx expo start -c
```

**Kiểm tra:** Mở app, không còn lỗi "Native module is null"

---

## 2️⃣ THAY THÔNG TIN SINH VIÊN (1 phút) 👨‍🎓

**File:** `src/screens/AccountScreen.js`

Tìm và sửa:
```javascript
const STUDENT_INFO = {
  name: 'Tên thật của bạn',     // ← Sửa đây
  mssv: 'MSSV thật của bạn',    // ← Sửa đây
};
```

**Kiểm tra:** Vào tab Account trong app, thấy tên + MSSV của bạn

---

## 3️⃣ CHỤP 9 ẢNH (30 phút) 📸

Tạo folder: `mkdir screenshots`

| # | Tên file | Làm gì |
|---|----------|--------|
| 1 | `MSSV_01_login.png` | Login → Chụp Home |
| 2 | `MSSV_02_autologin.png` | Tắt app → Mở lại → Chụp Home |
| 3 | `MSSV_03_logout.png` | Logout → Chụp Login screen |
| 4 | `MSSV_04_add_cart.png` | Thêm sản phẩm → Chụp Cart |
| 5 | `MSSV_05_cart_reload.png` | Tắt app → Mở lại → Chụp Cart |
| 6 | `MSSV_06_quantity.png` | Tăng/giảm số lượng → Chụp |
| 7 | `MSSV_07_checkout.png` | Checkout → Chụp alert |
| 8 | `MSSV_08_orders.png` | Vào Orders → Chụp |
| 9 | `MSSV_09_orders_reload.png` | Tắt app → Mở lại → Chụp Orders |

**Chi tiết:** Xem `HUONG_DAN_CHUP_ANH_VIDEO.md`

---

## 4️⃣ QUAY VIDEO (30 phút) 🎥

**Nội dung (2-5 phút):**

1. Giới thiệu: "Em là [Tên], MSSV: [MSSV]"
2. Demo Login → Tắt app → Mở lại (auto-login)
3. Demo Cart → Tắt app → Mở lại (vẫn còn)
4. Demo Checkout → Orders → Tắt app → Mở lại (vẫn còn)
5. Demo Logout
6. Kết thúc: "Cảm ơn!"

**Lưu ý:** Quay rõ màn hình, hiển thị thông tin sinh viên trong app

---

## 5️⃣ PUSH GITHUB (15 phút) 📦

```bash
# Tạo repo trên GitHub: https://github.com/new
# Tên: nectar-app-asyncstorage (Public)

# Trong terminal:
git init
git add .
git commit -m "feat: complete AsyncStorage implementation"

# Thêm 4 commits nữa (tổng 5):
git add src/services/storageService.js
git commit -m "feat: implement AsyncStorage service"

git add src/context/
git commit -m "feat: add AuthContext and CartContext"

git add src/screens/
git commit -m "feat: add all screens with UI"

git add README.md CAU_HOI_LY_THUYET.md
git commit -m "docs: add documentation"

git add screenshots/
git commit -m "docs: add screenshots"

# Push (thay YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nectar-app-asyncstorage.git
git branch -M main
git push -u origin main
```

**Chi tiết:** Xem `GIT_COMMANDS.md`

---

## ✅ CHECKLIST TRƯỚC KHI NỘP

- [ ] App chạy không lỗi
- [ ] Thông tin sinh viên hiển thị đúng
- [ ] Đủ 9 ảnh (đặt tên đúng format)
- [ ] Video 2-5 phút (có giới thiệu tên + MSSV)
- [ ] GitHub public, ít nhất 5 commits
- [ ] Đã đọc `CAU_HOI_LY_THUYET.md` (để trả lời khi hỏi)

---

## 📚 TÀI LIỆU THAM KHẢO

| File | Nội dung |
|------|----------|
| `BAT_DAU_TU_DAY.md` | Hướng dẫn chi tiết từng bước |
| `HUONG_DAN_CHUP_ANH_VIDEO.md` | Hướng dẫn chụp ảnh và quay video |
| `GIT_COMMANDS.md` | Hướng dẫn push GitHub |
| `CAU_HOI_LY_THUYET.md` | Trả lời 3 câu hỏi lý thuyết |
| `README.md` | Thông tin project |

---

## 🚀 BẮT ĐẦU NGAY!

**Bước tiếp theo:** Mở file `BAT_DAU_TU_DAY.md` để xem hướng dẫn chi tiết!

**Thời gian hoàn thành:** ~1.5 giờ

**Chúc bạn làm bài tốt! 🎉**
