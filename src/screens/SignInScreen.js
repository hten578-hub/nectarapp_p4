import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top grocery image */}
      <Image source={require('../../assets/sign in/Mask Group-1.png')} style={styles.topImage} resizeMode="contain" />

      {/* Title */}
      <Image source={require('../../assets/sign in/Get your groceries with nectar.png')} style={styles.titleImg} resizeMode="contain" />

      {/* Phone row */}
      <TouchableOpacity style={styles.phoneRow} onPress={() => navigation.navigate('PhoneNumber')}>
        <Image source={require('../../assets/sign in/Group 6798.png')} style={styles.phoneImg} resizeMode="contain" />
      </TouchableOpacity>

      {/* Or connect */}
      <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or connect with social media</Text>
        <View style={styles.line} />
      </View>

      {/* Google */}
      <TouchableOpacity onPress={() => navigation.navigate('SelectLocation')}>
        <Image source={require('../../assets/sign in/google.png')} style={styles.socialImg} resizeMode="contain" />
      </TouchableOpacity>

      {/* Facebook */}
      <TouchableOpacity onPress={() => navigation.navigate('SelectLocation')}>
        <Image source={require('../../assets/sign in/facebook.png')} style={styles.socialImg} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 0 },
  topImage: { width: '100%', height: 280 },
  titleImg: { width: 300, height: 70, marginTop: 16, alignSelf: 'flex-start', marginLeft: 24 },
  phoneRow: { width: '100%', paddingHorizontal: 24, marginTop: 8 },
  phoneImg: { width: '100%', height: 50 },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16, paddingHorizontal: 24 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  orText: { color: '#777', fontSize: 15, marginHorizontal: 10 },
  socialImg: { width: 320, height: 54, marginBottom: 12 },
});
