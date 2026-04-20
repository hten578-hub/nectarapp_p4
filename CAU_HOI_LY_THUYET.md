# 📝 TRẢ LỜI 3 CÂU HỎI LÝ THUYẾT

## Câu 1: AsyncStorage hoạt động như thế nào?

### Định nghĩa
**AsyncStorage** là một hệ thống lưu trữ dữ liệu dạng key-value, bất đồng bộ (asynchronous), không được mã hóa, và persistent (dữ liệu vẫn còn sau khi tắt app) trong React Native.

### Cách hoạt động

#### 1. **Kiến trúc**
```
┌─────────────────────────────────────┐
│   React Native App (JavaScript)     │
│   - saveUser()                       │
│   - getUser()                        │
└──────────────┬──────────────────────┘
               │ Bridge
               ↓
┌─────────────────────────────────────┐
│   Native Module (Java/Objective-C)  │
│   - AsyncStorage Native Module      │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Device Storage                     │
│   Android: SQLite Database           │
│   iOS: File System                   │
└─────────────────────────────────────┘
```

#### 2. **Lưu trữ dữ liệu**
- **Android**: Sử dụng SQLite database hoặc RocksDB
- **iOS**: Sử dụng file system (lưu trong thư mục Documents)
- Dữ liệu lưu dưới dạng **string** (key-value pairs)

#### 3. **Quy trình hoạt động**

**Khi lưu dữ liệu (setItem):**
```javascript
// 1. JavaScript gọi hàm
await AsyncStorage.setItem('@user', JSON.stringify(userData));

// 2. Dữ liệu được chuyển qua Bridge
// 3. Native module nhận request
// 4. Lưu vào SQLite (Android) hoặc File (iOS)
// 5. Trả về Promise resolved
```

**Khi đọc dữ liệu (getItem):**
```javascript
// 1. JavaScript gọi hàm
const data = await AsyncStorage.getItem('@user');

// 2. Request gửi qua Bridge
// 3. Native module đọc từ storage
// 4. Trả dữ liệu về JavaScript qua Bridge
// 5. Parse JSON và sử dụng
const user = JSON.parse(data);
```

#### 4. **Đặc điểm kỹ thuật**

| Đặc điểm | Mô tả |
|----------|-------|
| **Bất đồng bộ** | Sử dụng Promise/async-await, không block UI thread |
| **Persistent** | Dữ liệu vẫn còn sau khi tắt app, khởi động lại thiết bị |
| **Key-Value** | Lưu theo cặp key-value, key là string duy nhất |
| **Không mã hóa** | Dữ liệu lưu dạng plain text (cần mã hóa thủ công nếu cần) |
| **Giới hạn** | Android: ~6MB, iOS: không giới hạn (nhưng nên < 10MB) |

#### 5. **Ví dụ trong project**

```javascript
// src/services/storageService.js

// Lưu user với expiry
export const saveUser = async (user) => {
  try {
    // 1. Tính thời gian hết hạn (7 ngày)
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
    
    // 2. Chuyển object thành JSON string
    const userString = JSON.stringify(user);
    const expiryString = JSON.stringify(expiry);
    
    // 3. Lưu vào AsyncStorage (bất đồng bộ)
    await AsyncStorage.setItem('@nectar_user', userString);
    await AsyncStorage.setItem('@nectar_login_expiry', expiryString);
    
    // 4. Dữ liệu được lưu vào SQLite/File system
  } catch (e) {
    console.error('saveUser error:', e);
  }
};

// Đọc user và kiểm tra expiry
export const getUser = async () => {
  try {
    // 1. Đọc expiry từ storage
    const expiryString = await AsyncStorage.getItem('@nectar_login_expiry');
    
    // 2. Kiểm tra hết hạn
    if (expiryString && Date.now() > JSON.parse(expiryString)) {
      await clearUser(); // Xóa nếu hết hạn
      return null;
    }
    
    // 3. Đọc user data
    const userString = await AsyncStorage.getItem('@nectar_user');
    
    // 4. Parse JSON và trả về
    return userString ? JSON.parse(userString) : null;
  } catch (e) {
    console.error('getUser error:', e);
    return null;
  }
};
```

### Ưu điểm
✅ Đơn giản, dễ sử dụng  
✅ Persistent (dữ liệu không mất khi tắt app)  
✅ Bất đồng bộ (không block UI)  
✅ Cross-platform (Android & iOS)  

### Nhược điểm
❌ Không mã hóa (cần encrypt thủ công)  
❌ Chỉ lưu string (phải stringify/parse)  
❌ Không phù hợp với dữ liệu lớn (> 10MB)  
❌ Không có query phức tạp (không phải database)  

---

## Câu 2: Vì sao dùng AsyncStorage thay vì biến state?

### So sánh State vs AsyncStorage

| Tiêu chí | State (useState/Context) | AsyncStorage |
|----------|-------------------------|--------------|
| **Lưu trữ** | RAM (bộ nhớ tạm) | Disk (bộ nhớ vĩnh viễn) |
| **Tồn tại** | Chỉ khi app đang chạy | Vĩnh viễn, ngay cả khi tắt app |
| **Mất dữ liệu** | Mất khi tắt app, reload | Không mất khi tắt app |
| **Tốc độ** | Rất nhanh (trong RAM) | Chậm hơn (đọc/ghi disk) |
| **Dung lượng** | Giới hạn bởi RAM | Lớn hơn (giới hạn bởi disk) |
| **Sử dụng** | UI state, temporary data | User data, settings, cache |

### Lý do sử dụng AsyncStorage

#### 1. **Persistent Data (Dữ liệu vĩnh viễn)**

**❌ Vấn đề với State:**
```javascript
// Chỉ dùng state
const [user, setUser] = useState(null);

// Khi user login
setUser({ name: 'John', email: 'john@example.com' });

// ❌ Tắt app → Mở lại → user = null (mất dữ liệu!)
```

**✅ Giải pháp với AsyncStorage:**
```javascript
// Lưu vào AsyncStorage
const login = async (userData) => {
  await AsyncStorage.setItem('@user', JSON.stringify(userData));
  setUser(userData);
};

// Auto-login khi mở app
useEffect(() => {
  const loadUser = async () => {
    const saved = await AsyncStorage.getItem('@user');
    if (saved) setUser(JSON.parse(saved)); // ✅ Vẫn còn dữ liệu!
  };
  loadUser();
}, []);
```

#### 2. **User Experience (Trải nghiệm người dùng)**

**Với State:**
- User phải login lại mỗi lần mở app ❌
- Giỏ hàng bị xóa khi tắt app ❌
- Mất hết settings, preferences ❌

**Với AsyncStorage:**
- Auto-login, không cần login lại ✅
- Giỏ hàng vẫn còn sau khi tắt app ✅
- Settings được lưu vĩnh viễn ✅

#### 3. **Offline Support (Hỗ trợ offline)**

```javascript
// Lưu dữ liệu để dùng offline
const saveProducts = async (products) => {
  await AsyncStorage.setItem('@products', JSON.stringify(products));
};

// Khi không có internet, vẫn hiển thị được dữ liệu cũ
const loadProducts = async () => {
  try {
    const response = await fetch('/api/products'); // Online
    const data = await response.json();
    await saveProducts(data); // Cache lại
    return data;
  } catch (error) {
    // Offline → Đọc từ cache
    const cached = await AsyncStorage.getItem('@products');
    return cached ? JSON.parse(cached) : [];
  }
};
```

#### 4. **Ví dụ thực tế trong project**

**Giỏ hàng (Cart):**
```javascript
// ❌ Chỉ dùng state → Mất giỏ hàng khi tắt app
const [cartItems, setCartItems] = useState([]);

// ✅ Dùng AsyncStorage → Giỏ hàng vẫn còn
const [cartItems, setCartItems] = useState([]);

// Lưu mỗi khi thay đổi
useEffect(() => {
  AsyncStorage.setItem('@cart', JSON.stringify(cartItems));
}, [cartItems]);

// Load khi mở app
useEffect(() => {
  const loadCart = async () => {
    const saved = await AsyncStorage.getItem('@cart');
    if (saved) setCartItems(JSON.parse(saved));
  };
  loadCart();
}, []);
```

### Khi nào dùng State? Khi nào dùng AsyncStorage?

#### Dùng **State** khi:
- ✅ Dữ liệu tạm thời (modal open/close, loading state)
- ✅ UI state (selected tab, scroll position)
- ✅ Form input (chưa submit)
- ✅ Dữ liệu không cần lưu lại

#### Dùng **AsyncStorage** khi:
- ✅ User authentication (login token, user info)
- ✅ User preferences (theme, language, settings)
- ✅ Shopping cart, wishlist
- ✅ Offline cache
- ✅ Dữ liệu cần persistent

### Kết hợp State + AsyncStorage (Best Practice)

```javascript
// Kết hợp cả 2 để có performance tốt nhất
const [user, setUser] = useState(null); // State cho UI (nhanh)

// Load từ AsyncStorage khi mount
useEffect(() => {
  const loadUser = async () => {
    const saved = await AsyncStorage.getItem('@user');
    if (saved) setUser(JSON.parse(saved));
  };
  loadUser();
}, []);

// Lưu vào AsyncStorage khi thay đổi
const login = async (userData) => {
  setUser(userData); // Update UI ngay (nhanh)
  await AsyncStorage.setItem('@user', JSON.stringify(userData)); // Lưu vĩnh viễn
};
```

---

## Câu 3: So sánh AsyncStorage với Context API

### Bản chất khác nhau

| Đặc điểm | AsyncStorage | Context API |
|----------|--------------|-------------|
| **Loại** | Storage (lưu trữ dữ liệu) | State Management (quản lý state) |
| **Mục đích** | Lưu dữ liệu vĩnh viễn | Chia sẻ state giữa components |
| **Vị trí** | Disk (SQLite/File) | RAM (memory) |
| **Tồn tại** | Vĩnh viễn (persistent) | Chỉ khi app chạy |
| **Tốc độ** | Chậm (I/O disk) | Nhanh (trong RAM) |
| **Bất đồng bộ** | Có (async/await) | Không (synchronous) |

### Chức năng

#### AsyncStorage
```javascript
// Lưu trữ dữ liệu vĩnh viễn
await AsyncStorage.setItem('@user', JSON.stringify(user));
const user = await AsyncStorage.getItem('@user');
await AsyncStorage.removeItem('@user');
```

**Chức năng:**
- ✅ Lưu dữ liệu vào disk
- ✅ Đọc dữ liệu từ disk
- ✅ Xóa dữ liệu
- ❌ Không tự động update UI
- ❌ Không chia sẻ state giữa components

#### Context API
```javascript
// Chia sẻ state giữa components
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Bất kỳ component nào cũng truy cập được
const { user, setUser } = useContext(AuthContext);
```

**Chức năng:**
- ✅ Chia sẻ state giữa components
- ✅ Tự động re-render khi state thay đổi
- ✅ Tránh prop drilling
- ❌ Không lưu vĩnh viễn
- ❌ Mất dữ liệu khi tắt app

### Kết hợp AsyncStorage + Context API (Best Practice)

Trong project, chúng ta **kết hợp cả 2** để có ưu điểm của cả 2:

```javascript
// src/context/AuthContext.js

import { createContext, useState, useEffect } from 'react';
import { saveUser, getUser, clearUser } from '../services/storageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Context API: Quản lý state, chia sẻ giữa components
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // AsyncStorage: Load dữ liệu vĩnh viễn khi mount
  useEffect(() => {
    const loadUser = async () => {
      const saved = await getUser(); // Đọc từ AsyncStorage
      if (saved) setUser(saved);      // Update Context state
      setLoading(false);
    };
    loadUser();
  }, []);

  // Login: Lưu vào cả AsyncStorage và Context
  const login = async (email, password) => {
    const userData = { id: '1', name: 'John', email };
    await saveUser(userData);  // AsyncStorage: Lưu vĩnh viễn
    setUser(userData);         // Context: Update UI ngay
  };

  // Logout: Xóa khỏi cả AsyncStorage và Context
  const logout = async () => {
    await clearUser();  // AsyncStorage: Xóa vĩnh viễn
    setUser(null);      // Context: Update UI ngay
  };

  // Context API: Chia sẻ state và functions
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### Lợi ích khi kết hợp

#### 1. **Performance tốt**
```javascript
// Context: Đọc nhanh từ RAM
const { user } = useAuth(); // Instant!

// AsyncStorage: Chỉ đọc 1 lần khi mount
useEffect(() => {
  loadFromAsyncStorage(); // Chỉ chạy 1 lần
}, []);
```

#### 2. **UI responsive**
```javascript
const login = async (userData) => {
  setUser(userData);              // UI update ngay lập tức
  await saveUser(userData);       // Lưu vào disk (chậm hơn)
};
```

#### 3. **Persistent + Shareable**
```javascript
// Bất kỳ component nào cũng truy cập được
function Header() {
  const { user } = useAuth(); // Context API
  return <Text>Hello {user.name}</Text>;
}

function Profile() {
  const { user, logout } = useAuth(); // Context API
  return <Button onPress={logout}>Logout</Button>;
}

// Và dữ liệu vẫn còn sau khi tắt app (AsyncStorage)
```

### Bảng so sánh chi tiết

| Tiêu chí | AsyncStorage | Context API | Kết hợp cả 2 |
|----------|--------------|-------------|--------------|
| **Lưu trữ** | Disk | RAM | Disk + RAM |
| **Persistent** | ✅ Có | ❌ Không | ✅ Có |
| **Tốc độ đọc** | 🐢 Chậm | 🚀 Nhanh | 🚀 Nhanh (sau lần đầu) |
| **Chia sẻ state** | ❌ Không | ✅ Có | ✅ Có |
| **Auto re-render** | ❌ Không | ✅ Có | ✅ Có |
| **Offline** | ✅ Có | ❌ Không | ✅ Có |
| **Use case** | Storage | State management | Production app |

### Kết luận

**AsyncStorage** và **Context API** không phải là đối thủ, mà là **bổ sung cho nhau**:

- **AsyncStorage**: Lưu trữ dữ liệu vĩnh viễn (persistent storage)
- **Context API**: Quản lý và chia sẻ state (state management)
- **Kết hợp**: Lưu vào AsyncStorage để persistent, dùng Context để chia sẻ và update UI

Trong project Nectar App, chúng ta sử dụng:
1. **AsyncStorage** để lưu: user, cart, orders
2. **Context API** để chia sẻ state giữa các components
3. **Kết hợp** để có app hoàn chỉnh với UX tốt

---

## 📚 Tài liệu tham khảo

- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [React Context API](https://react.dev/reference/react/useContext)
- [React Native Storage Best Practices](https://reactnative.dev/docs/asyncstorage)
