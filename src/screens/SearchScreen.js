import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  Image, StyleSheet, Modal, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';import products, { filterCategories, filterBrands } from '../data/data';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [appliedCategories, setAppliedCategories] = useState([]);
  const [appliedBrands, setAppliedBrands] = useState([]);

  const filtered = useMemo(() => {
    let result = products;

    // Search by name
    if (query.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (appliedCategories.length > 0) {
      result = result.filter(p => appliedCategories.includes(p.category));
    }

    // Filter by brand
    if (appliedBrands.length > 0) {
      result = result.filter(p => appliedBrands.includes(p.brand));
    }

    return result;
  }, [query, appliedCategories, appliedBrands]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const applyFilter = () => {
    setAppliedCategories(selectedCategories);
    setAppliedBrands(selectedBrands);
    setShowFilter(false);
  };

  const openFilter = () => {
    setSelectedCategories(appliedCategories);
    setSelectedBrands(appliedBrands);
    setShowFilter(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Search bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} accessibilityLabel="Clear search">
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={openFilter} accessibilityLabel="Open filters">
          <Text style={styles.filterIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}

      {/* Filter Modal */}
      <Modal visible={showFilter} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowFilter(false)} accessibilityLabel="Close filters">
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filters</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Categories */}
              <Text style={styles.filterSectionTitle}>Categories</Text>
              {filterCategories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={styles.checkRow}
                  onPress={() => toggleCategory(cat)}
                  accessibilityLabel={`Filter by ${cat}`}
                >
                  <View style={[styles.checkbox, selectedCategories.includes(cat) && styles.checkboxActive]}>
                    {selectedCategories.includes(cat) && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.checkLabel, selectedCategories.includes(cat) && styles.checkLabelActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Brands */}
              <Text style={[styles.filterSectionTitle, { marginTop: 24 }]}>Brand</Text>
              {filterBrands.map(brand => (
                <TouchableOpacity
                  key={brand}
                  style={styles.checkRow}
                  onPress={() => toggleBrand(brand)}
                  accessibilityLabel={`Filter by ${brand}`}
                >
                  <View style={[styles.checkbox, selectedBrands.includes(brand) && styles.checkboxActive]}>
                    {selectedBrands.includes(brand) && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.checkLabel, selectedBrands.includes(brand) && styles.checkLabelActive]}>
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter} accessibilityLabel="Apply filters">
              <Text style={styles.applyBtnText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 56,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  clearIcon: { fontSize: 14, color: '#999', padding: 4 },
  filterBtn: {
    width: 52, height: 52,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: { fontSize: 20 },
  grid: { paddingHorizontal: 16, paddingBottom: 40 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    borderRadius: 24,
    width: '48%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  image: { width: '100%', height: 220, borderRadius: 24 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: '#999' },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F2F3F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  closeIcon: { fontSize: 20, color: '#1A1A1A' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  filterSectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 16 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 1.5, borderColor: '#E2E2E2',
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  checkboxActive: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  checkLabel: { fontSize: 16, color: '#1A1A1A' },
  checkLabelActive: { color: '#53B175', fontWeight: '600' },
  applyBtn: {
    backgroundColor: '#53B175', borderRadius: 18,
    paddingVertical: 18, alignItems: 'center', marginTop: 24,
  },
  applyBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
