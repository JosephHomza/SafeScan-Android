import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { theme } from "@/constants/theme";
import { useAuthStore } from "@/stores/authStore";

export default function GoogleAuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setSession, setUser } = useAuthStore();

  const startDemo = async () => {
    await setSession("demo-session");
    await setUser({
      id: "demo",
      name: "Safe scanner",
      email: "demo@safescan.app"
    });
    router.replace("/(tabs)/scanner");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", paddingHorizontal: 16, paddingTop: insets.top + 28, paddingBottom: Math.max(insets.bottom, 16) + 16 }}>
      <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, backgroundColor: theme.colors.surface, padding: 22, gap: 16, ...theme.shadows.panel }}>
        <Text style={{ color: theme.colors.accent, fontSize: 12, fontFamily: theme.fonts.sansSemiBold, letterSpacing: 1.8 }}>SAFESCAN QR</Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 34, fontFamily: theme.fonts.sansSemiBold, lineHeight: 38 }}>Continue to SafeScan</Text>
        <Text style={{ color: theme.colors.textSecondary, lineHeight: 22 }}>
          Use demo mode in Expo Go to preview the full SafeScan QR mobile flow. Google OAuth can be connected once the Android client ID is configured.
        </Text>
        <GoogleSignInButton onPress={startDemo} />
        <Text style={{ color: theme.colors.textSecondary, fontSize: 12, lineHeight: 18 }}>
          By signing up, you agree to SafeScan's Terms and Privacy Policy.
        </Text>
        <Button title="Use Demo Mode" variant="secondary" onPress={startDemo} />
      </View>
    </View>
  );
}
