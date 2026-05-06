import { Text, View } from "react-native";
import { theme } from "@/constants/theme";
import type { Signal } from "@/services/api";

export function SeverityBadge({ severity }: { severity: Signal["severity"] }) {
  const color = severity === "high" ? theme.colors.danger : severity === "medium" ? theme.colors.suspicious : theme.colors.safe;
  const prefix = severity === "high" ? "X" : severity === "medium" ? "!" : "OK";
  return (
    <View accessibilityLabel={`${severity} severity signal`} style={{ borderRadius: 999, borderWidth: 1, borderColor: `${color}55`, backgroundColor: `${color}1c`, paddingHorizontal: 10, paddingVertical: 6 }}>
      <Text style={{ color, fontSize: 11, fontWeight: "900" }}>{prefix} {severity.toUpperCase()}</Text>
    </View>
  );
}
