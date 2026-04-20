import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, toggleFavourite, isFavourite } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [detailOpen, setDetailOpen] = useState(true);
  const favourite = isFavourite(product.id);

  const handleAddToBasket = () => {
    addToCart(product, quantity);
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} accessibilityLabel="Go back">
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} accessibilityLabel="Share">
            <Text style={styles.shareIcon}>⬆</Text>
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
          {/* Dots */}
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          {/* Name & Favourite */}
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productUnit}>{product.unit}, Price</Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleFavourite(product)}
              style={styles.favBtn}
              accessibilityLabel={favourite ? 'Remove from favourites' : 'Add to favourites'}
            >
              <Text style={[styles.favIcon, favourite && styles.favActive]}>
                {favourite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quantity & Price */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
              accessibilityLabel="Decrease quantity"
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(q => q + 1)}
              accessibilityLabel="Increase quantity"
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.price}>${(product.price * quantity).toFixed(2)}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Product Detail accordion */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setDetailOpen(v => !v)}
            accessibilityLabel="Toggle product detail"
          >
            <Text style={styles.accordionTitle}>Product Detail</Text>
            <Text style={styles.accordionIcon}>{detailOpen ? '∧' : '∨'}</Text>
          </TouchableOpacity>
          {detailOpen && (
            <Text style={styles.accordionBody}>
              Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.
            </Text>
          )}

          <View style={styles.divider} />

          {/* Nutritions */}
          <TouchableOpacity style={styles.rowItem} accessibilityLabel="View nutritions">
            <Text style={styles.rowItemTitle}>Nutritions</Text>
            <View style={styles.rowItemRight}>
              <View style={styles.badge}><Text style={styles.badgeText}>100gr</Text></View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Review */}
          <TouchableOpacity style={styles.rowItem} accessibilityLabel="View reviews">
            <Text style={styles.rowItemTitle}>Review</Text>
            <View style={styles.rowItemRight}>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />
        </View>
      </ScrollView>

      {/* Add to Basket */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addBasketBtn}
          onPress={handleAddToBasket}
          accessibilityLabel="Add to basket"
        >
          <Text style={styles.addBasketText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  iconBtn: { padding: 8 },
  backIcon: { fontSize: 32, color: '#1A1A1A', lineHeight: 36 },
  shareIcon: { fontSize: 20, color: '#1A1A1A' },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F9F9F9',
    marginHorizontal: 16,
    borderRadius: 18,
    marginBottom: 0,
  },
  productImage: { width: width - 80, height: 220 },
  dots: { flexDirection: 'row', marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 3 },
  dotActive: { backgroundColor: '#53B175', width: 20 },
  infoCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -10,
  },
  nameRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  productName: { fontSize: 22, fontWeight: '700', color: '#1A1A1A' },
  productUnit: { fontSize: 14, color: '#999', marginTop: 2 },
  favBtn: { padding: 4 },
  favIcon: { fontSize: 26, color: '#ccc' },
  favActive: { color: '#E74C3C' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  qtyBtn: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1.5, borderColor: '#E2E2E2',
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 22, color: '#1A1A1A', lineHeight: 26 },
  qtyText: { fontSize: 18, fontWeight: '600', marginHorizontal: 16, minWidth: 24, textAlign: 'center' },
  price: { fontSize: 22, fontWeight: '700', color: '#1A1A1A', marginLeft: 'auto' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accordionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  accordionIcon: { fontSize: 18, color: '#1A1A1A' },
  accordionBody: { fontSize: 13, color: '#7C7C7C', lineHeight: 20, marginTop: 8 },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  rowItemTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  rowItemRight: { flexDirection: 'row', alignItems: 'center' },
  badge: { backgroundColor: '#F2F3F2', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, marginRight: 8 },
  badgeText: { fontSize: 12, color: '#7C7C7C' },
  stars: { fontSize: 16, color: '#F3A93C', marginRight: 8 },
  chevron: { fontSize: 22, color: '#1A1A1A' },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addBasketBtn: {
    backgroundColor: '#53B175',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addBasketText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
