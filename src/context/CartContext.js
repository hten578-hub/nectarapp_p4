import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveCart, getCart } from '../services/storageService';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart từ AsyncStorage khi app khởi động
  useEffect(() => {
    loadCart();
  }, []);

  // Lưu cart vào AsyncStorage mỗi khi thay đổi
  useEffect(() => {
    if (!loading) {
      // Serialize cart items - loại bỏ các thuộc tính không thể stringify
      const serializable = cartItems.map(item => ({
        ...item,
        image: typeof item.image === 'object' && item.image.uri 
          ? { uri: item.image.uri }
          : item.image
      }));
      saveCart(serializable);
    }
  }, [cartItems, loading]);

  const loadCart = async () => {
    const saved = await getCart();
    setCartItems(saved);
    setLoading(false);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
  };

  const clearCartItems = () => {
    setCartItems([]);
  };

  const toggleFavourite = (product) => {
    setFavourites(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavourite = (productId) => favourites.some(i => i.id === productId);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCartItems,
      favourites, toggleFavourite, isFavourite,
      cartCount, cartTotal, loading,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
