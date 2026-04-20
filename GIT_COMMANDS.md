# 📦 HƯỚNG DẪN PUSH CODE LÊN GITHUB

## 🎯 Yêu cầu
- ✅ Ít nhất 5 commits
- ✅ Commit message có ý nghĩa
- ✅ Repository public trên GitHub

---

## 📝 CÁC BƯỚC THỰC HIỆN

### Bước 1: Tạo repository trên GitHub

1. Truy cập: https://github.com/new
2. Điền thông tin:
   - **Repository name**: `nectar-app-asyncstorage`
   - **Description**: `Ứng dụng mua sắm tạp hóa với AsyncStorage - Bài tập React Native`
   - **Public** (bắt buộc để giáo viên xem được)
   - ✅ Không tick "Add a README file" (vì đã có sẵn)
3. Nhấn "Create repository"

### Bước 2: Khởi tạo Git trong project

```bash
# Di chuyển vào thư mục project
cd nectar-app

# Khởi tạo git (nếu chưa có)
git init

# Kiểm tra status
git status
```

### Bước 3: Tạo .gitignore (nếu chưa có)

```bash
# Tạo file .gitignore
echo "node_modules/" > .gitignore
echo ".expo/" >> .gitignore
echo ".expo-shared/" >> .gitignore
echo "npm-debug.*" >> .gitignore
echo "*.jks" >> .gitignore
echo "*.p8" >> .gitignore
echo "*.p12" >> .gitignore
echo "*.key" >> .gitignore
echo "*.mobileprovision" >> .gitignore
echo ".DS_Store" >> .gitignore
```

### Bước 4: Commit từng phần (ít nhất 5 commits)

#### Commit 1: Initial project setup
```bash
git add package.json App.js index.js app.json
git commit -m "chore: initial project setup with Expo and React Native"
```

#### Commit 2: AsyncStorage service
```bash
git add src/services/storageService.js
git commit -m "feat: implement AsyncStorage service for user, cart, and orders"
```

**Giải thích commit message:**
- `feat`: Thêm tính năng mới
- Mô tả rõ ràng: "implement AsyncStorage service..."

#### Commit 3: Authentication context
```bash
git add src/context/AuthContext.js src/screens/LoginScreen.js
git commit -m "feat: add authentication with auto-login and 7-day expiry"
```

#### Commit 4: Cart persistence
```bash
git add src/context/CartContext.js src/screens/CartScreen.js
git commit -m "feat: implement cart persistence with AsyncStorage"
```

#### Commit 5: Orders feature
```bash
git add src/screens/OrdersScreen.js src/screens/AccountScreen.js
git commit -m "feat: add orders screen with checkout and persistence"
```

#### Commit 6: Navigation setup
```bash
git add src/navigation/AppNavigator.js
git commit -m "feat: setup navigation with auth flow and main tabs"
```

#### Commit 7: UI screens
```bash
git add src/screens/HomeScreen.js src/screens/ExploreScreen.js src/screens/ProductDetailScreen.js
git commit -m "feat: add home, explore, and product detail screens"
```

#### Commit 8: Onboarding flow
```bash
git add src/screens/SplashScreen.js src/screens/OnboardingScreen.js src/screens/SignInScreen.js
git commit -m "feat: add splash and onboarding screens"
```

#### Commit 9: Documentation
```bash
git add README.md CAU_HOI_LY_THUYET.md HUONG_DAN_CHUP_ANH_VIDEO.md
git commit -m "docs: add comprehensive documentation and guides"
```

#### Commit 10: Screenshots
```bash
git add screenshots/
git commit -m "docs: add screenshots for demonstration"
```

### Bước 5: Kết nối với GitHub và push

```bash
# Thêm remote repository (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/nectar-app-asyncstorage.git

# Đổi tên branch thành main (nếu đang là master)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

---

## 📋 MẪU COMMIT MESSAGES TỐT

### Format chuẩn:
```
<type>: <description>

[optional body]
```

### Các type thường dùng:

| Type | Mô tả | Ví dụ |
|------|-------|-------|
| `feat` | Thêm tính năng mới | `feat: add login with AsyncStorage` |
| `fix` | Sửa bug | `fix: resolve cart serialization issue` |
| `docs` | Thêm/sửa tài liệu | `docs: update README with setup guide` |
| `style` | Format code, không thay đổi logic | `style: format code with prettier` |
| `refactor` | Refactor code | `refactor: extract storage logic to service` |
| `test` | Thêm test | `test: add unit tests for storageService` |
| `chore` | Công việc maintenance | `chore: update dependencies` |

### Ví dụ commit messages hay:

✅ **TỐT:**
```bash
git commit -m "feat: implement AsyncStorage service with async/await and error handling"
git commit -m "feat: add auto-login with 7-day expiry using AsyncStorage"
git commit -m "feat: persist cart items to AsyncStorage on every change"
git commit -m "fix: resolve image serialization issue in cart items"
git commit -m "docs: add comprehensive README with setup instructions"
```

❌ **KHÔNG TỐT:**
```bash
git commit -m "update"
git commit -m "fix bug"
git commit -m "add code"
git commit -m "asdasd"
git commit -m "done"
```

---

## 🔄 WORKFLOW ĐỀ XUẤT (10 COMMITS)

Nếu muốn có nhiều commits hơn (để điểm cao hơn), chia nhỏ như sau:

```bash
# 1. Project setup
git add package.json app.json
git commit -m "chore: initialize Expo project with dependencies"

# 2. AsyncStorage service - User
git add src/services/storageService.js
git commit -m "feat: add AsyncStorage functions for user authentication"

# 3. AsyncStorage service - Cart & Orders
git add src/services/storageService.js
git commit -m "feat: add AsyncStorage functions for cart and orders"

# 4. Auth Context
git add src/context/AuthContext.js
git commit -m "feat: implement AuthContext with auto-login and expiry"

# 5. Cart Context
git add src/context/CartContext.js
git commit -m "feat: implement CartContext with persistence"

# 6. Login Screen
git add src/screens/LoginScreen.js
git commit -m "feat: create login screen with AsyncStorage integration"

# 7. Cart Screen
git add src/screens/CartScreen.js
git commit -m "feat: create cart screen with quantity controls and checkout"

# 8. Orders Screen
git add src/screens/OrdersScreen.js src/screens/AccountScreen.js
git commit -m "feat: add orders screen and account logout functionality"

# 9. Navigation
git add src/navigation/AppNavigator.js
git commit -m "feat: setup navigation with auth flow and bottom tabs"

# 10. Onboarding
git add src/screens/SplashScreen.js src/screens/OnboardingScreen.js
git commit -m "feat: add splash and onboarding screens"

# 11. Home & Explore
git add src/screens/HomeScreen.js src/screens/ExploreScreen.js
git commit -m "feat: implement home and explore screens with products"

# 12. Product Detail
git add src/screens/ProductDetailScreen.js
git commit -m "feat: add product detail screen with add to cart"

# 13. Bug fixes
git add src/screens/CartScreen.js
git commit -m "fix: add loading state to CartScreen"

# 14. Documentation
git add README.md
git commit -m "docs: add comprehensive README with project info"

# 15. Theory answers
git add CAU_HOI_LY_THUYET.md
git commit -m "docs: add detailed answers to theory questions"

# 16. Screenshots
git add screenshots/
git commit -m "docs: add 9 screenshots for demonstration"

# 17. Final touches
git add .
git commit -m "chore: final cleanup and polish"
```

---

## 🎯 CHECKLIST TRƯỚC KHI PUSH

- [ ] Đã tạo repository trên GitHub (public)
- [ ] Đã có ít nhất 5 commits
- [ ] Commit messages có ý nghĩa (dùng feat, fix, docs, ...)
- [ ] Đã thêm .gitignore (không push node_modules)
- [ ] README.md đầy đủ thông tin
- [ ] Đã test push thành công
- [ ] Repository link hoạt động

---

## 🔍 KIỂM TRA SAU KHI PUSH

1. Truy cập: `https://github.com/YOUR_USERNAME/nectar-app-asyncstorage`
2. Kiểm tra:
   - ✅ Code đã được push đầy đủ
   - ✅ README.md hiển thị đẹp
   - ✅ Có ít nhất 5 commits (xem tab "Commits")
   - ✅ Screenshots hiển thị trong README
   - ✅ Repository là public

---

## 🚨 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: "remote origin already exists"
```bash
# Xóa remote cũ
git remote remove origin

# Thêm lại remote mới
git remote add origin https://github.com/YOUR_USERNAME/nectar-app-asyncstorage.git
```

### Lỗi 2: "failed to push some refs"
```bash
# Pull trước khi push
git pull origin main --rebase

# Sau đó push lại
git push -u origin main
```

### Lỗi 3: "Permission denied"
```bash
# Sử dụng Personal Access Token thay vì password
# Tạo token tại: https://github.com/settings/tokens
# Khi push, dùng token làm password
```

### Lỗi 4: Push nhầm node_modules
```bash
# Xóa cache
git rm -r --cached node_modules

# Thêm vào .gitignore
echo "node_modules/" >> .gitignore

# Commit lại
git add .gitignore
git commit -m "chore: add node_modules to gitignore"
git push
```

---

## 📊 MẪU REPOSITORY STRUCTURE

Sau khi push, repository của bạn sẽ trông như thế này:

```
nectar-app-asyncstorage/
├── .gitignore
├── README.md
├── CAU_HOI_LY_THUYET.md
├── HUONG_DAN_CHUP_ANH_VIDEO.md
├── package.json
├── App.js
├── app.json
├── index.js
├── src/
│   ├── services/
│   │   └── storageService.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── CartScreen.js
│   │   ├── OrdersScreen.js
│   │   └── ...
│   └── navigation/
│       └── AppNavigator.js
├── screenshots/
│   ├── MSSV_01_login.png
│   ├── MSSV_02_autologin.png
│   └── ...
└── assets/
    └── ...
```

---

## 🎓 TIPS ĐỂ ĐẠT ĐIỂM CAO

1. **Commit thường xuyên:**
   - Mỗi tính năng 1 commit
   - Không commit 1 lần toàn bộ code

2. **Commit message rõ ràng:**
   - Dùng prefix: feat, fix, docs, ...
   - Mô tả ngắn gọn nhưng đầy đủ

3. **README đẹp:**
   - Có emoji để sinh động
   - Có ảnh minh họa
   - Hướng dẫn chi tiết

4. **Code sạch:**
   - Format đẹp
   - Có comment
   - Không có code thừa

5. **Tài liệu đầy đủ:**
   - Trả lời 3 câu hỏi chi tiết
   - Có ví dụ code minh họa
   - Giải thích rõ ràng

---

**Chúc bạn push code thành công! 🚀**
