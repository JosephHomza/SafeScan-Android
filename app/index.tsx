import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { colors, spacing, theme, typography } from "@/constants/theme";
import { useAuthStore } from "@/stores/authStore";

const stats = [
  { value: "AI", label: "Risk verdicts" },
  { value: "ZBar", label: "QR decoding" },
  { value: "SQR", label: "Reward tiers" }
] as const;

export default function LandingScreen() {
  const router = useRouter();
  const { setSession, setUser } = useAuthStore();

  const startDemo = async () => {
    await setSession("demo-session");
    await setUser({ id: "demo", name: "Safe scanner", email: "demo@safescan.app" });
    router.replace("/(tabs)/scanner");
  };

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: spacing.screenPad, paddingVertical: 28 }}>
          <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, backgroundColor: colors.surface, padding: 24, gap: 26, ...theme.shadows.panel }}>
            <View style={{ gap: 14 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <Text style={{ ...typography.badge, color: colors.accent, letterSpacing: 2.1 }}>HACKABULL DEMO</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text style={{ color: colors.textSecondary, fontFamily: theme.fonts.sansSemiBold, fontSize: 12, letterSpacing: 1 }}>Powered By</Text>
                  <Text style={{ color: colors.accent, fontFamily: theme.fonts.sansSemiBold, fontSize: 12, letterSpacing: 1 }}>SOLANA</Text>
                </View>
              </View>

              <Text style={{ ...typography.h1, fontSize: 56, lineHeight: 54, letterSpacing: 0 }}>SafeScan QR</Text>
              <Text style={{ color: colors.textPrimary, fontSize: 20, lineHeight: 27, fontFamily: theme.fonts.sansSemiBold }}>
                Can you distinguish a malicious QR?
              </Text>
              <Text style={{ ...typography.body, fontSize: 17, lineHeight: 28 }}>
                A trust layer for QR links, wallet prompts, and payment redirects. Decode the payload, score the risk, and keep the user in control before anything runs.
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
                <View style={{ flexGrow: 1 }}>
                  <Button title="Scan QR" onPress={startDemo} />
                </View>
                <View style={{ flexGrow: 1 }}>
                  <Button title="Airdrop" variant="secondary" onPress={startDemo} />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {stats.map((stat) => (
                <View key={stat.label} style={{ flex: 1, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.045)", padding: 14 }}>
                  <Text style={{ color: colors.accent, fontFamily: theme.fonts.display, fontSize: 16 }}>{stat.value}</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 12, marginTop: 6, lineHeight: 16 }}>{stat.label}</Text>
                </View>
              ))}
            </View>

            <View style={{ minHeight: 360, borderWidth: 1, borderColor: colors.border, borderRadius: 8, backgroundColor: "#070b12", overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
              <View style={{ width: 220, aspectRatio: 0.52, borderRadius: 36, borderWidth: 1, borderColor: "rgba(255,255,255,0.24)", padding: 18, backgroundColor: colors.surfaceElevated, transform: [{ rotate: "-8deg" }] }}>
                <View style={{ width: 72, height: 7, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.16)", alignSelf: "center", marginBottom: 18 }} />
                <View style={{ flex: 1, borderWidth: 1, borderColor: colors.scanner.frameBorder, borderRadius: 24, padding: 14, flexDirection: "row", flexWrap: "wrap", gap: 7, backgroundColor: colors.scanner.frameBgStart }}>
                  {Array.from({ length: 30 }).map((_, index) => (
                    <View key={index} style={{ width: "14%", aspectRatio: 1, borderRadius: 4, backgroundColor: index % 4 === 0 || index % 7 === 0 ? colors.scanner.gridAccent : colors.scanner.gridLight }} />
                  ))}
                </View>
                <View style={{ marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.risk.safe.border, backgroundColor: colors.risk.safe.bg, padding: 12 }}>
                  <Text style={{ textAlign: "center", color: colors.safe, fontFamily: theme.fonts.display, letterSpacing: 1 }}>SAFE</Text>
                </View>
              </View>
              <View style={{ position: "absolute", left: 18, right: 18, bottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", borderRadius: 16, backgroundColor: "rgba(5,8,13,0.72)", padding: 16 }}>
                <Text style={{ color: colors.accent, fontFamily: theme.fonts.display, fontSize: 12, letterSpacing: 1.6 }}>SOLANA MOBILE 3D SCAN MODEL</Text>
                <Text style={{ color: colors.textSecondary, lineHeight: 21, marginTop: 6 }}>Cyber security inspired software, QR inspection, and threat shielding in one scene.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
