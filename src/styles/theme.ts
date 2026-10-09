import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#0D0D0D',     // Main screen background
  surface: '#1A1A1A',        // Cards, Quick Actions, and list items
  primary: '#E5A93C',        // Cravings Gold (Buttons, highlights)
  textPrimary: '#FFFFFF',    // Main headings, titles, balances
  textMuted: '#8E8E93',      // Subtitles, dates, secondary labels
  success: '#219653',        // Positive market change (+2.35%)
  error: '#EB5757',          // Negative market change / Failed transactions
  border: '#2C2C2E',         // Subtle divider lines
};

export const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});