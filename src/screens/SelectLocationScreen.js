import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const zones = ['Banasree', 'Gulshan', 'Dhanmondi', 'Mirpur'];
const areas = ['Block A', 'Block B', 'Block C', 'Block D'];

export default function SelectLocationScreen({ navigation }) {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');
  const [showZone, setShowZone] = useState(false);
  const [showArea, setShowArea] = useState(false);

  return (
    <ImageBackground source={require('../../assets/location/Mask Group.png')} style={styles.container} resizeMode="cover">
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/location/illustration.png')} style={styles.illustration} resizeMode="contain" />

      <Text style={styles.title}>Select Your Location</Text>
      <Text style={styles.subtitle}>Switch on your location to stay in tune with{'\n'}what's happening in your area</Text>

      <Text style={styles.label}>Your Zone</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowZone(!showZone)}>
        <Text style={styles.dropdownText}>{zone}</Text>
        <Text style={styles.chevron}>∨</Text>
      </TouchableOpacity>
      {showZone && (
        <View style={styles.dropdownList}>
          {zones.map((z, i) => (
            <TouchableOpacity key={i} style={styles.dropdownItem} onPress={() => { setZone(z); setShowZone(false); }}>
              <Text style={styles.dropdownItemText}>{z}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Your Area</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowArea(!showArea)}>
        <Text style={[styles.dropdownText, !area && { color: '#bbb' }]}>{area || 'Types of your area'}</Text>
        <Text style={styles.chevron}>∨</Text>
      </TouchableOpacity>
      {showArea && (
        <View style={styles.dropdownList}>
          {areas.map((a, i) => (
            <TouchableOpacity key={i} style={styles.dropdownItem} onPress={() => { setArea(a); setShowArea(false); }}>
              <Text style={styles.dropdownItemText}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={{ flex: 1 }} />

      <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 24, backgroundColor: '#fff' },
  back: { marginBottom: 16 },
  backIcon: { fontSize: 32, color: '#333' },
  illustration: { width: 200, height: 160, marginBottom: 20, alignSelf: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#999', textAlign: 'center', fontSize: 13, marginBottom: 32, lineHeight: 20 },
  label: { color: '#999', fontSize: 13, marginBottom: 6, marginTop: 16 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 14, backgroundColor: '#fff' },
  dropdownText: { fontSize: 15, color: '#333' },
  chevron: { fontSize: 16, color: '#999' },
  dropdownList: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginTop: 4, backgroundColor: '#fff' },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  dropdownItemText: { fontSize: 14, color: '#333' },
  submitBtn: { backgroundColor: '#53B175', borderRadius: 30, padding: 16, alignItems: 'center', marginBottom: 32 },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
