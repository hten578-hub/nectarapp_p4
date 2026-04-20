import React from 'react';
import {
  View, Text, FlatList,
  TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../data/data';

export default function ExploreScreen({ navigation }) {
  const filtered = categories;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Category', { category: item })}
      activeOpacity={0.8}
      accessibilityLabel={`Browse ${item.name}`}
    >
      {item.extraImage ? (
        <View style={styles.cardWrapper}>
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
          <View style={styles.overlayContainer}>
            <Image source={item.extraImage} style={styles.cardImageOverlay} resizeMode="contain" />
          </View>
        </View>
      ) : (
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Find Products</Text>

      {/* Search */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.8}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search Store</Text>
      </TouchableOpacity>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
    height: 56,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchPlaceholder: { fontSize: 15, color: '#999' },
  grid: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    width: '48%',
    borderRadius: 18,
    overflow: 'hidden',
    minHeight: 170,
  },
  cardWrapper: { width: '100%', height: 170 },
  cardImage: { width: '100%', height: 170 },
  overlayContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImageOverlay: {
    width: '75%',
    height: '75%',
  },
});
