import React from 'react';
import {
  View, Text, ScrollView, TextInput, Image,
  TouchableOpacity, StyleSheet, FlatList, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { exclusiveOffers, bestSelling, groceries } from '../data/data';

const { width } = Dimensions.get('window');

// ⚠️ QUAN TRỌNG: Thay đổi thông tin sinh viên của bạn ở đây
const STUDENT_INFO = {
  name: 'Nguyễn Thị Huệ Minh',
  mssv: '23810310177',
};

const groceryCategories = [
  { id: 'g1', name: 'Pulses', color: '#FFF8E1', image: { uri: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=200' } },
  { id: 'g2', name: 'Rice', color: '#E8F5E9', image: { uri: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' } },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Student Info Banner - Hiển thị trong video demo */}
        <View style={styles.studentBanner}>
          <Text style={styles.studentBannerText}>
            👨‍🎓 {STUDENT_INFO.name} - MSSV: {STUDENT_INFO.mssv}
          </Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/home/Group.png')} style={styles.carrotImage} resizeMode="contain" />
          <Image source={require('../../assets/home/Group 6809.png')} style={styles.locationImage} resizeMode="contain" />
        </View>

        {/* Search */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.8}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search Store</Text>
        </TouchableOpacity>

        {/* Banner */}
        <Image
          source={require('../../assets/home/banner.png')}
          style={styles.banner}
          resizeMode="contain"
        />

        {/* Exclusive Offer */}
        <SectionHeader title="Exclusive Offer" onSeeAll={() => {}} />
        <FlatList
          data={exclusiveOffers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
          )}
        />

        {/* Best Selling */}
        <SectionHeader title="Best Selling" onSeeAll={() => {}} />
        <FlatList
          data={bestSelling}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
          )}
        />

        {/* Groceries */}
        <SectionHeader title="Groceries" onSeeAll={() => {}} />
        {/* Grocery category chips */}
        <FlatList
          data={groceryCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <View style={[styles.groceryChip, { backgroundColor: item.color }]}>
              <Image source={item.image} style={styles.chipImage} resizeMode="contain" />
              <Text style={styles.chipText}>{item.name}</Text>
            </View>
          )}
        />
        <FlatList
          data={groceries}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.listPadding, { marginBottom: 24 }]}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  studentBanner: {
    backgroundColor: '#53B175',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  studentBannerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  header: { alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  carrotImage: { width: 40, height: 40 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationImage: { width: 150, height: 24, marginTop: 4 },
  location: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 20,
    height: 56,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchPlaceholder: { fontSize: 15, color: '#999' },
  banner: {
    width: '92%',
    height: 130,
    alignSelf: 'center',
    borderRadius: 18,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  seeAll: { fontSize: 14, color: '#53B175', fontWeight: '600' },
  listPadding: { paddingHorizontal: 16, paddingBottom: 16 },
  groceryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    marginBottom: 12,
    minWidth: 140,
  },
  chipImage: { width: 40, height: 40, marginRight: 10 },
  chipText: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
});
