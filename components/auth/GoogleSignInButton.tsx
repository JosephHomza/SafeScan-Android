import { Pressable, Text, View } from "react-native";

export function GoogleSignInButton({ onPress }: { onPress?: () => void }) {
  return (
    <View style={{ gap: 8 }}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={{ minHeight: 50, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10 }}
      >
        <View style={{ width: 24, height: 24, borderRadius: 999, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#4285f4", fontSize: 16, fontWeight: "900" }}>G</Text>
        </View>
        <Text style={{ color: "#111827", fontWeight: "800" }}>Sign in with Google</Text>
      </Pressable>
      <Text style={{ color: "#64748b", fontSize: 12 }}>Google logo/auth exchange is ready for production wiring after client ID setup.</Text>
    </View>
  );
}
