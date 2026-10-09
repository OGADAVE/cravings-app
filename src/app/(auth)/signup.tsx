import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, writeBatch } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { COLORS } from '../../styles/theme';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create User in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Generate a clean unique referral token for this new user
      const dynamicReferralToken = `CRV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // 2. Initialize Firestore Batch Operations (Wallet-First Framework)
      const batch = writeBatch(db);

      const userRef = doc(db, 'users', uid);
      const walletRef = doc(db, 'wallets', uid);

      // Set Profile Document
      batch.set(userRef, {
        userId: uid,
        fullName,
        email,
        phone,
        referralCode: dynamicReferralToken,
        referredBy: referralCode.trim() || null,
        createdAt: new Date().toISOString(),
      });

      // Set Ledger Document with 0 starting balances
      batch.set(walletRef, {
        userId: uid,
        ngn_balance: 0.00,
        btc_balance: 0.000000,
        usdt_balance: 0.00,
        referral_balance: 0.00,
        updatedAt: new Date().toISOString(),
      });

      // Execute atomic transaction to cloud server
      await batch.commit();
      
      // Global observer handles redirect automatically!
    } catch (error: any) {
      Alert.alert('Registration Halted', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>CREATE ACCOUNT</Text>
        <Text style={styles.subtitleText}>Join the CRAVINGS financial ecosystem.</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor={COLORS.textMuted}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="yourname@example.com"
          placeholderTextColor={COLORS.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+234..."
          placeholderTextColor={COLORS.textMuted}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a strong password"
          placeholderTextColor={COLORS.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Text style={styles.label}>Referral Code (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter code if referred"
          placeholderTextColor={COLORS.textMuted}
          value={referralCode}
          onChangeText={setReferralCode}
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#0D0D0D" />
          ) : (
            <Text style={styles.buttonText}>Get Started</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkContainer} 
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.linkText}>
            Already have an account? <Text style={{ color: COLORS.primary }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 32,
    marginTop: 20,
  },
  logoText: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  subtitleText: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});