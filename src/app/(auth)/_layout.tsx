import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { GLOBAL_STYLES } from '../styles/theme';

export default function RootLayout() {
  return (
    <SafeAreaView style={GLOBAL_STYLES.safeArea}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* App launches into auth screens first */}
        <Stack.Screen name="(auth)" /> 
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaView>
  );
}