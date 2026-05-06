import { ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: insets.top + 22, paddingBottom: Math.max(insets.bottom, 20) + 36 }}>
      <Text style={{ color: theme.colors.textPrimary, fontSize: 26, fontWeight: "700" }}>Privacy Policy</Text>
      <Text style={{ color: theme.colors.textSecondary, marginTop: 12, lineHeight: 22 }}>
        SafeScan QR analyzes QR payloads for security risk, uses Google OAuth for authentication, and stores only the data required to provide the service.
      </Text>
    </ScrollView>
  );
}
