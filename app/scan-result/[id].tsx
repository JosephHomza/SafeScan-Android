import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RiskBreakdownPanel } from "@/components/risk/RiskBreakdownPanel";
import { theme } from "@/constants/theme";
import type { AnalyzeResponse } from "@/services/api";

const demoResult: AnalyzeResponse = {
  url: "https://claim-sqr-airdrop.xyz/connect?approve=all",
  overallRisk: "high",
  confidenceScore: 91,
  verdict: "This QR payload shows multiple high-risk signals including a new domain, redirect behavior, and wallet-drain style approval language.",
  source: "demo-fallback",
  scannedAt: new Date().toISOString(),
  signals: [
    { check: "Domain Age", result: "8 days old", severity: "high", description: "New domains are commonly used in phishing campaigns.", passed: false },
    { check: "Wallet Pattern", result: "approve=all", severity: "high", description: "The URL appears to request broad wallet approval before the user can inspect the action.", passed: false },
    { check: "Redirect Chain", result: "2 hops detected", severity: "medium", description: "Extra redirects can hide the final destination.", passed: false }
  ]
};

export default function ScanResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: insets.top + 28, paddingBottom: Math.max(insets.bottom, 16) + 28, gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ color: theme.colors.accent, fontSize: 12, fontFamily: theme.fonts.sansSemiBold, letterSpacing: 1.8 }}>SCAN RESULT</Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 30, fontFamily: theme.fonts.sansSemiBold }}>Verdict detail</Text>
        <Text style={{ color: theme.colors.textSecondary }}>Result ID: {id}</Text>
      </View>
      <RiskBreakdownPanel result={demoResult} />
    </ScrollView>
  );
}
