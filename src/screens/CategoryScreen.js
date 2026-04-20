import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { allProducts } from '../data/data';

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;

  const products = allProducts.filter(p =>
    p.category === category.name.replace('\n', ' ')
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      {item.extraImage ? (
        <View style={styles.cardWrapper}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <View style={styles.overlayContainer}>
            <Image source={item.extraImage} style={styles.overlayImage} resizeMode="contain" />
          </View>
        </View>
      ) : (
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} accessibilityLabel="Go back">
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{category.name.replace('\n', ' ')}</Text>
        <TouchableOpacity style={styles.filterBtn} accessibilityLabel="Filter">
          <Text style={styles.filterIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {products.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: { padding: 4 },
  backIcon: { fontSize: 32, color: '#1A1A1A', lineHeight: 36 },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  filterBtn: { padding: 4 },
  filterIcon: { fontSize: 20, color: '#1A1A1A' },
  grid: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 16, gap: 12 },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    width: '47%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 8,
    backgroundColor: '#fff',
  },
  cardWrapper: { width: '100%', height: 190 },
  image: { width: '100%', height: 190, borderRadius: 12 },
  overlayContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: { width: '45%', height: '75%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
});
