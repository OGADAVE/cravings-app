
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/theme';

const QUICK_ACTIONS = [
  { title: 'Buy Airtime', icon: 'phone-portrait-outline' },
  { title: 'Buy Data', icon: 'wifi-outline' },
  { title: 'Bulk SMS', icon: 'chatbubble-ellipses-outline' },
  { title: 'Crypto', icon: 'swap-horizontal-outline' },
  { title: 'Electricity', icon: 'flash-outline' },
  { title: 'Betting', icon: 'football-outline' },
] as const;

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Brand header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>WELCOME TO</Text>
            <Text style={styles.brand}>
              CRAVINGS<Text style={styles.brandDot}>.</Text>
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={({ pressed }) => [
              styles.notificationButton,
              pressed && styles.pressed,
            ]}
            onPress={() => {}}
          >
            <Ionicons
              name="notifications-outline"
              size={23}
              color={COLORS.primary}
            />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <Text style={styles.tagline}> Your Digital Lifestyle Unlocked.</Text>

        {/* Wallet balance */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceTopRow}>
            <View style={styles.balanceLabelRow}>
              <Ionicons
                name="wallet-outline"
                size={19}
                color={COLORS.primary}
              />
              <Text style={styles.balanceLabel}>Wallet Balance</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                balanceVisible ? 'Hide balance' : 'Show balance'
              }
              accessibilityState={{ expanded: balanceVisible }}
              hitSlop={10}
              onPress={() => setBalanceVisible((visible) => !visible)}
            >
              <Ionicons
                name={balanceVisible ? 'eye-outline' : 'eye-off-outline'}
                size={21}
                color={COLORS.textPrimary}
              />
            </Pressable>
          </View>

          <Text style={styles.balanceAmount}>
            {balanceVisible ? '₦0.00' : '₦••••••'}
          </Text>

          <Text style={styles.balanceNote}>
            Your money, all in one place
          </Text>

          <View style={styles.balanceActions}>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.primaryBalanceButton,
                pressed && styles.pressed,
              ]}
              onPress={() => {}}
            >
              <Ionicons
                name="add-circle-outline"
                size={19}
                color={COLORS.background}
              />
              <Text style={styles.primaryBalanceButtonText}>
                Add Money
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.secondaryBalanceButton,
                pressed && styles.pressed,
              ]}
              onPress={() => {}}
            >
              <Ionicons
                name="arrow-up-circle-outline"
                size={19}
                color={COLORS.primary}
              />
              <Text style={styles.secondaryBalanceButtonText}>
                Withdraw
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionHint}>
            What would you like to do?
          </Text>
        </View>

        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.title}
              accessibilityRole="button"
              accessibilityLabel={action.title}
              style={({ pressed }) => [
                styles.actionCard,
                pressed && styles.actionCardPressed,
              ]}
              onPress={() => {}}
            >
              <View style={styles.actionIcon}>
                <Ionicons
                  name={action.icon}
                  size={25}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.actionBottomRow}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Ionicons
                  name="arrow-forward"
                  size={15}
                  color={COLORS.textMuted}
                />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Brand banner */}
        <View style={styles.servicesBanner}>
          <View style={styles.servicesCopy}>
            <Text style={styles.servicesEyebrow}>
              THE CRAVINGS ADVANTAGE
            </Text>

            <Text style={styles.servicesTitle}>
              Everything you need.{'\n'}One powerful platform.
            </Text>

            <Text style={styles.servicesDescription}>
              Stay connected, send messages, and explore crypto.
            </Text>
          </View>

          <MaterialCommunityIcons
            name="lightning-bolt-circle"
            size={48}
            color={COLORS.primary}
          />
        </View>

        {/* Recent activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.comingSoon}>YOUR TRANSACTIONS</Text>
        </View>

        <View style={styles.emptyActivity}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="receipt-outline"
              size={27}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>Nothing here yet</Text>

          <Text style={styles.emptyDescription}>
            Your transactions will appear here when you start using CRAVINGS.
          </Text>
        </View>

        <Text style={styles.footerText}>
          CRAVINGS · Your Digital Lifestyle Unlocked.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.textMuted,
    marginBottom: 3,
  },
  brand: {
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: COLORS.textPrimary,
  },
  brandDot: {
    color: COLORS.primary,
  },
  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  pressed: {
    opacity: 0.75,
  },
  tagline: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 22,
  },
  balanceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  balanceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  balanceAmount: {
    color: COLORS.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    marginTop: 17,
    letterSpacing: 0.3,
  },
  balanceNote: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 5,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  primaryBalanceButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  primaryBalanceButtonText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '800',
  },
  secondaryBalanceButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  secondaryBalanceButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 27,
    marginBottom: 15,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionHint: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    flexGrow: 1,
    minHeight: 108,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    justifyContent: 'space-between',
  },
  actionCardPressed: {
    opacity: 0.8,
    borderColor: COLORS.primary,
  },
  actionIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#292318',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 12,
  },
  actionTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    flexShrink: 1,
  },
  servicesBanner: {
    marginTop: 25,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  servicesCopy: {
    flex: 1,
  },
  servicesEyebrow: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 9,
  },
  servicesTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
  },
  servicesDescription: {
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 8,
  },
  comingSoon: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginTop: 5,
  },
  emptyActivity: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#292318',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  emptyDescription: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 25,
  },
});