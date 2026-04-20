import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function FavouriteScreen({ navigation }) {
  const { favourites, toggleFavourite, addToCart } = useCart();

  const addAllToCart = () => {
    favourites.forEach(item => addToCart(item));
  };

  if (favourites.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.header}>Favourrite</Text>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyText}>No favourites yet</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Favourrite</Text>

      <FlatList
        data={favourites}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            activeOpacity={0.8}
          >
            <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemUnit}>{item.unit}, Price</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addAllBtn}
          onPress={addAllToCart}
          accessibilityLabel="Add all to cart"
        >
          <Text style={styles.addAllText}>Add All To Cart</Text>
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
  separator: { height: 1, backgroundColor: '#F0F0F0' },
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16,
  },
  itemImage: {
    width: 60, height: 60, borderRadius: 10,
    backgroundColor: '#F9F9F9', marginRight: 14,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  itemUnit: { fontSize: 12, color: '#999', marginTop: 2 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: '#1A1A1A', marginRight: 8 },
  chevron: { fontSize: 22, color: '#B3B3B3' },
  bottomBar: {
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: '#fff',
  },
  addAllBtn: {
    backgroundColor: '#53B175', borderRadius: 18,
    paddingVertical: 18, alignItems: 'center',
  },
  addAllText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 60, color: '#ccc', marginBottom: 16 },
  emptyText: { fontSize: 18, color: '#999' },
});
