import { useState } from "react";
import { Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { theme } from "@/constants/theme";

const tokenAddress = "Bpdt7Hey78HeEEr9Q6x19gYAns5n6w44LdjJhxN3pump";

export function TokenInfoCard() {
  const [copied, setCopied] = useState(false);

  return (
    <Card style={{ gap: 14, borderColor: "rgba(103, 242, 200, 0.2)", backgroundColor: "rgba(255,255,255,0.035)" }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.accent, fontSize: 11, fontWeight: "900", letterSpacing: 1.6 }}>TOKEN NAME</Text>
          <View style={{ alignSelf: "flex-start", marginTop: 8, borderWidth: 1, borderColor: "rgba(103, 242, 200, 0.22)", backgroundColor: "rgba(103, 242, 200, 0.08)", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 }}>
            <Text style={{ color: theme.colors.textPrimary, fontWeight: "900" }}>SafeScan</Text>
          </View>
        </View>
        <View>
          <Text style={{ color: theme.colors.accent, fontSize: 11, fontWeight: "900", letterSpacing: 1.6 }}>TICKER</Text>
          <View style={{ marginTop: 8, borderWidth: 1, borderColor: "rgba(103, 242, 200, 0.22)", backgroundColor: "rgba(103, 242, 200, 0.08)", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 }}>
            <Text style={{ color: theme.colors.textPrimary, fontWeight: "900", letterSpacing: 1.2 }}>SQR</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ color: theme.colors.accent, fontSize: 11, fontWeight: "900", letterSpacing: 1.6 }}>ADDRESS</Text>
        <View style={{ marginTop: 8, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, backgroundColor: "rgba(0,0,0,0.16)", padding: 12 }}>
          <Text style={{ color: theme.colors.textPrimary, lineHeight: 20 }}>{tokenAddress}</Text>
        </View>
      </View>
      <Button
        title={copied ? "Copied" : "Copy Token Address"}
        variant="secondary"
        onPress={async () => {
          await Clipboard.setStringAsync(tokenAddress);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
      />
    </Card>
  );
}
