import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../src/styles/theme';

export default function HomeScreen() {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.titleText}>CRAVINGS</Text>
      <Text style={styles.subtitleText}>Fintech Infrastructure Online</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  titleText: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitleText: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
});