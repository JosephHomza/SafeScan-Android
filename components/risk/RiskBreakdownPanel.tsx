import { Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { RiskGauge } from "@/components/risk/RiskGauge";
import { SignalAccordion } from "@/components/risk/SignalAccordion";
import type { AnalyzeResponse } from "@/services/api";
import { theme } from "@/constants/theme";

const severityRank = { high: 0, medium: 1, low: 2 };

export function RiskBreakdownPanel({ result }: { result: AnalyzeResponse }) {
  const signals = [...result.signals].sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
  const status = result.overallRisk === "high" ? "DANGEROUS" : result.overallRisk === "suspicious" ? "CAUTION" : "SAFE";
  const accent = result.overallRisk === "high" ? theme.colors.danger : result.overallRisk === "suspicious" ? theme.colors.suspicious : theme.colors.safe;

  return (
    <Card style={{ gap: 16, backgroundColor: "rgba(8, 16, 29, 0.98)", borderColor: `${accent}66` }}>
      {result.overallRisk === "high" ? (
        <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "rgba(255, 110, 127, 0.38)", backgroundColor: "rgba(255, 110, 127, 0.16)", padding: 13 }}>
          <Text style={{ color: "#ffd7dc", fontWeight: "900", lineHeight: 20 }}>Caution: this QR code shows strong indicators of a phishing or wallet drain attack.</Text>
        </View>
      ) : null}

      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <RiskGauge score={result.confidenceScore} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: "900", letterSpacing: 1.7 }}>SCAN VERDICT</Text>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 30, lineHeight: 34, fontWeight: "900", marginTop: 4 }}>{status}</Text>
          <Text style={{ color: theme.colors.textSecondary, lineHeight: 21, marginTop: 8 }}>{result.verdict}</Text>
        </View>
      </View>

      <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.04)", padding: 14 }}>
        <Text style={{ color: theme.colors.accent, fontSize: 11, fontWeight: "900", letterSpacing: 1.4 }}>DECODED URL / PAYLOAD</Text>
        <Text style={{ color: theme.colors.textPrimary, lineHeight: 21, marginTop: 8 }}>{result.url}</Text>
      </View>

      <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.04)", padding: 12, flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View style={{ borderRadius: 999, borderWidth: 1, borderColor: result.source === "backend" ? "rgba(80, 227, 164, 0.32)" : "rgba(255, 187, 85, 0.32)", backgroundColor: result.source === "backend" ? "rgba(80, 227, 164, 0.1)" : "rgba(255, 187, 85, 0.1)", paddingHorizontal: 10, paddingVertical: 6 }}>
          <Text style={{ color: result.source === "backend" ? theme.colors.safe : theme.colors.suspicious, fontSize: 11, fontWeight: "900" }}>{result.source === "backend" ? "LIVE API" : "DEMO FALLBACK"}</Text>
        </View>
        <Text style={{ color: theme.colors.textSecondary, flex: 1 }}>SafeScan backend: safescan-qr.onrender.com</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <View>
          <Text style={{ color: theme.colors.accent, fontSize: 11, fontWeight: "900", letterSpacing: 1.4 }}>CONFIDENCE BREAKDOWN</Text>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 20, fontWeight: "900", marginTop: 4 }}>{result.confidenceScore} / 100 risk score</Text>
        </View>
        <View style={{ borderRadius: 999, backgroundColor: `${accent}29`, paddingHorizontal: 12, paddingVertical: 8 }}>
          <Text style={{ color: accent, fontWeight: "900" }}>{status}</Text>
        </View>
      </View>

      {signals.map((signal) => (
        <SignalAccordion key={`${signal.check}-${signal.result}`} signal={signal} />
      ))}
    </Card>
  );
}
