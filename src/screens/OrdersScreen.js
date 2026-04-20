import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getOrders } from '../services/storageService';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.header}>My Orders</Text>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#53B175" />
          <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.header}>My Orders</Text>
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Đơn #{orders.length - index}</Text>
              <Text style={styles.orderStatus}>✅ Đã đặt</Text>
            </View>
            <Text style={styles.orderDate}>🕐 {item.date}</Text>

            {item.items.map((p, i) => (
              <View key={i} style={styles.productRow}>
                <Image source={p.image} style={styles.productImg} resizeMode="contain" />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{p.name}</Text>
                  <Text style={styles.productUnit}>{p.unit} × {p.quantity}</Text>
                </View>
                <Text style={styles.productPrice}>${(p.price * p.quantity).toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalValue}>${item.total.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    fontSize: 22, fontWeight: '700', color: '#1A1A1A',
    textAlign: 'center', paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 12, color: '#999', fontSize: 14 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyText: { fontSize: 16, color: '#999' },
  list: { padding: 16 },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  orderId: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  orderStatus: { fontSize: 13, color: '#53B175', fontWeight: '600' },
  orderDate: { fontSize: 12, color: '#999', marginBottom: 12 },
  productRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1, borderTopColor: '#F0F0F0',
  },
  productImg: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#F9F9F9', marginRight: 12 },
  productInfo: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  productUnit: { fontSize: 12, color: '#999', marginTop: 2 },
  productPrice: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 12, paddingTop: 12,
    borderTopWidth: 1.5, borderTopColor: '#F0F0F0',
  },
  totalLabel: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#53B175' },
});
