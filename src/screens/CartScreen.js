import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../services/storageService';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCartItems, loading } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);
    try {
      const order = {
        id: 'order_' + Date.now(),
        items: cartItems.map(i => ({ ...i })),
        total: cartTotal,
        date: new Date().toLocaleString('vi-VN'),
      };
      await saveOrder(order);
      clearCartItems();
      Alert.alert(
        '🎉 Đặt hàng thành công!',
        `Đơn hàng của bạn đã được đặt.\nTổng: $${cartTotal.toFixed(2)}`,
        [{ text: 'Xem đơn hàng', onPress: () => navigation.navigate('Account') }]
      );
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể đặt hàng. Vui lòng thử lại.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.header}>My Cart</Text>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#53B175" />
          <Text style={styles.loadingText}>Đang tải giỏ hàng...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.header}>My Cart</Text>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>My Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} accessibilityLabel="Remove item">
                  <Text style={styles.removeIcon}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.itemUnit}>{item.unit}, Price</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  accessibilityLabel="Decrease quantity"
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  accessibilityLabel="Increase quantity"
                >
                  <Text style={[styles.qtyBtnText, styles.qtyBtnPlus]}>+</Text>
                </TouchableOpacity>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Checkout */}
      <View style={styles.checkout}>
        <TouchableOpacity
          style={[styles.checkoutBtn, checkingOut && styles.checkoutBtnDisabled]}
          onPress={handleCheckout}
          disabled={checkingOut}
          accessibilityLabel="Proceed to checkout"
        >
          {checkingOut ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.checkoutText}>Go to Checkout</Text>
              <View style={styles.totalBadge}>
                <Text style={styles.totalBadgeText}>${cartTotal.toFixed(2)}</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 22, fontWeight: '700', color: '#1A1A1A',
    textAlign: 'center', paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  list: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 },
  separator: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 4 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  itemImage: {
    width: 70, height: 70, borderRadius: 12,
    backgroundColor: '#F9F9F9', marginRight: 12,
  },
  itemInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 15, fontWeight: '600', color: '#1A1A1A', flex: 1 },
  removeIcon: { fontSize: 14, color: '#B3B3B3', paddingLeft: 8 },
  itemUnit: { fontSize: 12, color: '#999', marginTop: 2, marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1.5, borderColor: '#E2E2E2',
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 18, color: '#1A1A1A', lineHeight: 22 },
  qtyBtnPlus: { color: '#53B175' },
  qtyText: { fontSize: 16, fontWeight: '600', marginHorizontal: 12 },
  itemPrice: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginLeft: 'auto' },
  checkout: {
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: '#fff',
  },
  checkoutBtn: {
    backgroundColor: '#53B175', borderRadius: 18,
    paddingVertical: 18, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  checkoutBtnDisabled: { opacity: 0.6 },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  totalBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4,
  },
  totalBadgeText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyText: { fontSize: 18, color: '#999', marginBottom: 20 },
  shopBtn: {
    backgroundColor: '#53B175', borderRadius: 14,
    paddingHorizontal: 32, paddingVertical: 14,
  },
  shopBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
