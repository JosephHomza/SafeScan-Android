import { Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { theme } from "@/constants/theme";
import type { tiers } from "@/constants/tiers";

type Tier = (typeof tiers)[number];

export function TierCard({ tier, unlocked }: { tier: Tier; unlocked: boolean }) {
  return (
    <Card style={{ opacity: unlocked ? 1 : 0.62, minHeight: 170, borderColor: unlocked ? "rgba(80, 227, 164, 0.42)" : theme.colors.border, backgroundColor: unlocked ? "rgba(80, 227, 164, 0.08)" : theme.colors.surfaceElevated }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
        <Text style={{ color: theme.colors.accent, fontWeight: "900", letterSpacing: 1.2 }}>{tier.rank.toUpperCase()}</Text>
        <View style={{ borderWidth: 1, borderColor: unlocked ? "rgba(80, 227, 164, 0.35)" : theme.colors.border, backgroundColor: unlocked ? "rgba(80, 227, 164, 0.12)" : "rgba(255,255,255,0.05)", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
          <Text style={{ color: unlocked ? theme.colors.safe : theme.colors.muted, fontSize: 11, fontWeight: "900" }}>{unlocked ? "UNLOCKED" : "LOCKED"}</Text>
        </View>
      </View>
      <Text style={{ color: theme.colors.textPrimary, fontSize: 22, fontWeight: "900", marginTop: 8 }}>{tier.name}</Text>
      <Text style={{ color: theme.colors.textSecondary, marginTop: 8, lineHeight: 21 }}>Scan {tier.scanThreshold} QR codes and invite {tier.referralThreshold} user{tier.referralThreshold === 1 ? "" : "s"}.</Text>
      <Text style={{ color: theme.colors.safe, marginTop: "auto", fontWeight: "900" }}>{tier.reward}</Text>
    </Card>
  );
}
