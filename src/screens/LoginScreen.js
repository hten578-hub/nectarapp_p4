import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e) {
      Alert.alert('Lỗi đăng nhập', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* Logo */}
        <View style={styles.logoArea}>
          <Text style={styles.logo}>🥦</Text>
          <Text style={styles.appName}>nectar</Text>
          <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        </View>

        {/* Form */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password input"
        />

        <TouchableOpacity
          style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          accessibilityLabel="Login button"
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.loginText}>Log In</Text>
          }
        </TouchableOpacity>

        <Text style={styles.hint}>
          Dùng bất kỳ email + password để đăng nhập
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  logoArea: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 60 },
  appName: { fontSize: 36, fontWeight: '700', color: '#53B175', marginTop: 8 },
  subtitle: { fontSize: 14, color: '#7C7C7C', textAlign: 'center', marginTop: 8 },
  label: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 8, marginTop: 16 },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  loginBtn: {
    backgroundColor: '#53B175',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 32,
  },
  loginBtnDisabled: { opacity: 0.6 },
  loginText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  hint: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 16 },
});
