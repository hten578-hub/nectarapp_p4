import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

export default function VerificationScreen({ navigation }) {
  const [code, setCode] = useState('');

  return (
    <ImageBackground source={require('../../assets/verification/Mask Group.png')} style={styles.container} resizeMode="cover">
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Enter your 4-digit code</Text>
      <Text style={styles.label}>Code</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={(t) => { if (t.length <= 4) setCode(t); }}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
        autoFocus
      />
      <View style={styles.inputLine} />

      <View style={{ flex: 1 }} />

      <View style={styles.bottomRow}>
        <TouchableOpacity>
          <Text style={styles.resend}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('SelectLocation')}
        >
          <Text style={styles.nextIcon}>›</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
  back: { paddingHorizontal: 20, marginBottom: 24 },
  backIcon: { fontSize: 32, color: '#333' },
  title: { fontSize: 22, fontWeight: 'bold', paddingHorizontal: 24, marginBottom: 24 },
  label: { color: '#999', fontSize: 13, paddingHorizontal: 24, marginBottom: 6 },
  input: { fontSize: 22, color: '#333', paddingHorizontal: 24, letterSpacing: 8 },
  inputLine: { height: 1, backgroundColor: '#ddd', marginHorizontal: 24, marginTop: 4 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 32 },
  resend: { color: '#53B175', fontWeight: '600', fontSize: 15 },
  nextBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#53B175', alignItems: 'center', justifyContent: 'center' },
  nextIcon: { fontSize: 32, color: '#fff', lineHeight: 36 },
});
