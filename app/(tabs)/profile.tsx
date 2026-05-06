import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { ReferralCard } from "@/components/shared/ReferralCard";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { useAuthStore } from "@/stores/authStore";
import { useScanStore } from "@/stores/scanStore";
import { theme } from "@/constants/theme";

const links = [
  ["Privacy Policy", "https://safescan-qr.onrender.com/legal/privacy-policy"],
  ["Terms of Use", "https://safescan-qr.onrender.com/legal/terms-of-use"],
  ["Cookie Policy", "https://safescan-qr.onrender.com/legal/cookie-policy"],
  ["Data Request", "https://safescan-qr.onrender.com/legal/data-request"],
  ["Security", "https://safescan-qr.onrender.com/security"],
  ["Contact", "mailto:privacy@safescan-qr.onrender.com"]
] as const;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, clearAuth } = useAuthStore();
  const history = useScanStore((state) => state.history);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: insets.top + 22, gap: 16, paddingBottom: Math.max(insets.bottom, 20) + 36 }}>
      <View style={{ borderColor: theme.colors.border, borderWidth: 1, borderRadius: 18, backgroundColor: theme.colors.surface, padding: 16, gap: 12 }}>
        <View style={{ width: 58, height: 58, borderRadius: 18, backgroundColor: theme.colors.primary, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 22, fontWeight: "900" }}>{(user?.name ?? "SS").slice(0, 2).toUpperCase()}</Text>
        </View>
        <View>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 26, fontWeight: "900" }}>{user?.name ?? "Safe scanner"}</Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>{user?.email ?? "demo@safescan.app"}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, padding: 12 }}>
            <Text style={{ color: theme.colors.textPrimary, fontSize: 22, fontWeight: "900" }}>{Math.max(7, history.length)}</Text>
            <Text style={{ color: theme.colors.textSecondary }}>Scans</Text>
          </View>
          <View style={{ flex: 1, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, padding: 12 }}>
            <Text style={{ color: theme.colors.textPrimary, fontSize: 22, fontWeight: "900" }}>Referrer</Text>
            <Text style={{ color: theme.colors.textSecondary }}>Tier</Text>
          </View>
        </View>
      </View>

      <ReferralCard />
      <WalletConnect />

      <View style={{ borderColor: theme.colors.border, borderWidth: 1, borderRadius: 18, backgroundColor: theme.colors.surface, padding: 16, gap: 12 }}>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: "800" }}>Important links</Text>
        {links.map(([label, href]) => (
          <Pressable key={label} accessibilityRole="link" onPress={() => Linking.openURL(href)} style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
            <Text style={{ color: theme.colors.textSecondary }}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <Button title="Sign Out" variant="secondary" onPress={clearAuth} />
    </ScrollView>
  );
}
