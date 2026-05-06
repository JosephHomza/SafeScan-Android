import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { theme } from "@/constants/theme";
import { config } from "@/constants/config";
import { useAuthStore } from "@/stores/authStore";

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setSession, setUser } = useAuthStore();

  const startDemo = async () => {
    await setSession("demo-session");
    await setUser({ id: "demo", name: "Safe scanner", email: "demo@safescan.app" });
    router.replace("/(tabs)/scanner");
  };

  return (
    <LinearGradient colors={[theme.colors.background, "#0a1420", theme.colors.backgroundEnd]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 18, paddingTop: insets.top + 28, paddingBottom: Math.max(insets.bottom, 18) + 18, justifyContent: "center", gap: 24 }}>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: "900", letterSpacing: 1.8 }}>HACKABULL DEMO</Text>
            <Text style={{ color: theme.colors.muted, fontSize: 12, fontWeight: "800", letterSpacing: 1 }}>POWERED BY SOLANA</Text>
          </View>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 48, lineHeight: 52, fontWeight: "900" }}>SafeScan QR</Text>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 20, lineHeight: 27, fontWeight: "900" }}>Can you distinguish a malicious QR?</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 18, lineHeight: 28 }}>
            A trust layer for QR links, wallet prompts, and payment redirects. Decode the payload, score the risk, and keep the user in control before anything runs.
          </Text>
        </View>

        <View style={{ height: 300, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, backgroundColor: "#070b12", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <View style={{ position: "absolute", width: 235, height: 235, borderRadius: 999, borderWidth: 1, borderColor: "rgba(103, 242, 200, 0.2)", transform: [{ scaleY: 0.42 }] }} />
          <View style={{ position: "absolute", width: 168, height: 168, borderRadius: 999, borderWidth: 1, borderColor: "rgba(90, 140, 255, 0.24)" }} />
          <View style={{ width: 112, height: 112, borderRadius: 24, backgroundColor: "#f8fafc", padding: 12, gap: 8 }}>
            {[0, 1, 2].map((row) => (
              <View key={row} style={{ flexDirection: "row", gap: 8, flex: 1 }}>
                {[0, 1, 2].map((col) => (
                  <View key={`${row}-${col}`} style={{ flex: 1, borderRadius: 4, backgroundColor: (row + col) % 2 === 0 ? "#07070a" : "#94a3b8" }} />
                ))}
              </View>
            ))}
          </View>
          <View style={{ position: "absolute", bottom: 16, left: 16, right: 16, borderRadius: 16, padding: 14, backgroundColor: "rgba(5, 8, 13, 0.72)", borderColor: "rgba(255,255,255,0.12)", borderWidth: 1 }}>
            <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: "900", letterSpacing: 1.6 }}>SOLANA MOBILE SCAN MODEL</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 6, lineHeight: 20 }}>Cyber security inspired software, QR inspection, and threat shielding in one mobile scene.</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {[["AI", "Risk verdicts"], ["QR", "Decoding"], ["SQR", "Reward tiers"]].map(([value, label]) => (
            <View key={label} style={{ flex: 1, borderColor: "rgba(255,255,255,0.1)", borderWidth: 1, borderRadius: 8, padding: 12, backgroundColor: "rgba(255,255,255,0.045)" }}>
              <Text style={{ color: theme.colors.accent, fontWeight: "900" }}>{value}</Text>
              <Text style={{ color: theme.colors.textSecondary, marginTop: 4, fontSize: 12 }}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={{ gap: 10 }}>
          <Button title="Launch Demo App" onPress={startDemo} />
          <Button title="Continue with Google" variant="secondary" onPress={() => router.push("/auth/google")} />
          <Text style={{ color: theme.colors.muted }}>Beta - {config.appVersion}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
