import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

// ⚠️ QUAN TRỌNG: Thay đổi thông tin sinh viên của bạn ở đây (để hiển thị trong video demo)
const STUDENT_INFO = {
  name: 'Nguyễn Thị Huệ Minh',
  mssv: '23810310177',
};

const menuItems = [
  { icon: '💳', label: 'My Details' },
  { icon: '📍', label: 'Delivery Address' },
  { icon: '💰', label: 'Payment Methods' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '❓', label: 'Help' },
  { icon: '⚙', label: 'About' },
];

export default function AccountScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất', style: 'destructive',
          onPress: async () => { await logout(); },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Account</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Student Info - Hiển thị trong video demo */}
        <View style={styles.studentInfo}>
          <Text style={styles.studentLabel}>👨‍🎓 Sinh viên:</Text>
          <Text style={styles.studentName}>{STUDENT_INFO.name}</Text>
          <Text style={styles.studentMssv}>MSSV: {STUDENT_INFO.mssv}</Text>
        </View>

        {/* Profile */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View>
            <Text style={styles.name}>{user?.name || 'Afsar Hossen'}</Text>
            <Text style={styles.email}>{user?.email || 'example@email.com'}</Text>
          </View>
        </View>

        {/* Orders button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Orders')}
          accessibilityLabel="My Orders"
        >
          <Text style={styles.menuIcon}>📦</Text>
          <Text style={styles.menuLabel}>Orders</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Other menu items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} accessibilityLabel={item.label}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} accessibilityLabel="Log out">
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 100,
  },
  studentInfo: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#53B175',
  },
  studentLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  studentMssv: {
    fontSize: 14,
    color: '#53B175',
    fontWeight: '600',
  },
  profile: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 20,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#F2F3F2', alignItems: 'center',
    justifyContent: 'center', marginRight: 16,
  },
  avatarText: { fontSize: 32 },
  name: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  email: { fontSize: 14, color: '#7C7C7C', marginTop: 2 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  menuIcon: { fontSize: 20, marginRight: 16, width: 28 },
  menuLabel: { flex: 1, fontSize: 16, color: '#1A1A1A' },
  chevron: { fontSize: 22, color: '#B3B3B3' },
  logoutBtn: {
    marginHorizontal: 20, marginTop: 24,
    borderWidth: 1.5, borderColor: '#53B175',
    borderRadius: 14, paddingVertical: 16, alignItems: 'center',
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: '#53B175' },
});
