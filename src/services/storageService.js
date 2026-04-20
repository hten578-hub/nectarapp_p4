import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@nectar_user',
  CART: '@nectar_cart',
  ORDERS: '@nectar_orders',
  LOGIN_EXPIRY: '@nectar_login_expiry',
};

// ─── Auth ──────────────────────────────────────────────────────────────────────

export const saveUser = async (user) => {
  try {
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 ngày
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    await AsyncStorage.setItem(KEYS.LOGIN_EXPIRY, JSON.stringify(expiry));
  } catch (e) {
    console.error('saveUser error:', e);
  }
};

export const getUser = async () => {
  try {
    const expiry = await AsyncStorage.getItem(KEYS.LOGIN_EXPIRY);
    if (expiry && Date.now() > JSON.parse(expiry)) {
      await clearUser();
      return null;
    }
    const data = await AsyncStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('getUser error:', e);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER);
    await AsyncStorage.removeItem(KEYS.LOGIN_EXPIRY);
  } catch (e) {
    console.error('clearUser error:', e);
  }
};

// ─── Cart ──────────────────────────────────────────────────────────────────────

export const saveCart = async (cartItems) => {
  try {
    await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cartItems));
  } catch (e) {
    console.error('saveCart error:', e);
  }
};

export const getCart = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('getCart error:', e);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.CART);
  } catch (e) {
    console.error('clearCart error:', e);
  }
};

// ─── Orders ───────────────────────────────────────────────────────────────────

export const saveOrder = async (order) => {
  try {
    const existing = await getOrders();
    const updated = [order, ...existing];
    await AsyncStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));
  } catch (e) {
    console.error('saveOrder error:', e);
  }
};

export const getOrders = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('getOrders error:', e);
    return [];
  }
};
