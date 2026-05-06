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
    <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", paddingHorizontal: 16, paddingTop: insets.top + 24, paddingBottom: Math.max(insets.bottom, 16) + 16, gap: 16 }}>
      <Text style={{ color: theme.colors.textPrimary, fontSize: 34, fontWeight: "900" }}>Continue to SafeScan</Text>
      <Text style={{ color: theme.colors.textSecondary, lineHeight: 22 }}>
        Use demo mode in Expo Go to preview the full SafeScan QR mobile flow. Google OAuth can be connected once the Android client ID is configured.
      </Text>
      <GoogleSignInButton onPress={startDemo} />
      <Button title="Use Demo Mode" variant="secondary" onPress={startDemo} />
    </View>
  );
}
