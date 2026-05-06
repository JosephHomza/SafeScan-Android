import { useState } from "react";
import { LayoutAnimation, Pressable, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { SeverityBadge } from "@/components/risk/SeverityBadge";
import type { Signal } from "@/services/api";
import { theme } from "@/constants/theme";

export function SignalAccordion({ signal }: { signal: Signal }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.14)", padding: 0, overflow: "hidden" }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded((value) => !value);
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, padding: 14 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.textPrimary, fontWeight: "700" }}>{signal.check}</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>{signal.result}</Text>
          </View>
          <SeverityBadge severity={signal.severity} />
        </View>
        {expanded ? <Text style={{ color: theme.colors.textSecondary, lineHeight: 22, paddingHorizontal: 14, paddingBottom: 14 }}>{signal.description}</Text> : null}
      </Pressable>
    </Card>
  );
}
