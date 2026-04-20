import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/onbording/8140 1.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Image source={require('../../assets/onbording/Group.png')} style={styles.logo} resizeMode="contain" />
        <Image source={require('../../assets/onbording/Welcome to our store.png')} style={styles.titleImg} resizeMode="contain" />
        <Image source={require('../../assets/onbording/Ger your groceries in as fast as one hour.png')} style={styles.subtitleImg} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Image source={require('../../assets/onbording/button.png')} style={styles.btnImg} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  content: { flex: 1, justifyContent: 'flex-end', padding: 32, paddingBottom: 120 },
  logo: { width: 50, height: 50, marginBottom: 16, alignSelf: 'center' },
  titleImg: { width: 280, height: 80, marginBottom: 8 },
  subtitleImg: { width: 280, height: 40, marginBottom: 32 },
  btnImg: { width: 320, height: 60 },
});
