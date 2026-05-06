import { useState } from "react";
import { ActivityIndicator, Linking, ScrollView, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { RiskBreakdownPanel } from "@/components/risk/RiskBreakdownPanel";
import { LoadingSteps } from "@/components/shared/LoadingSteps";
import { ServerWakeBanner } from "@/components/shared/ServerWakeBanner";
import { theme } from "@/constants/theme";
import { useAnalyze } from "@/hooks/useAnalyze";
import { reportUrl } from "@/services/api";
import { useScanStore } from "@/stores/scanStore";
import { shareScanReport } from "@/utils/sharing";
import { truncateMiddle } from "@/utils/url";

export function ScanDrawer({ payload, onClear }: { payload: string | null; onClear: () => void }) {
  const analyze = useAnalyze();
  const addScan = useScanStore((state) => state.addScan);
  const [reported, setReported] = useState(false);

  if (!payload) return null;

  const result = analyze.data;

  const runAnalysis = () => {
    setReported(false);
    analyze.mutate(payload, {
      onSuccess: (scan) => {
        addScan({ ...scan, id: `${Date.now()}` });
      }
    });
  };

  return (
    <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: "92%", backgroundColor: "rgba(8, 16, 29, 0.98)", borderTopLeftRadius: result ? 0 : 8, borderTopRightRadius: result ? 0 : 8, borderColor: theme.colors.border, borderWidth: 1, padding: 16, gap: 12 }}>
      <View style={{ alignSelf: "center", width: 42, height: 4, borderRadius: 999, backgroundColor: theme.colors.border, marginBottom: 2 }} />
      <ScrollView contentContainerStyle={{ gap: 12 }} showsVerticalScrollIndicator={false}>
        <Text style={{ color: theme.colors.accent, fontSize: 11, fontWeight: "900", letterSpacing: 1.5 }}>DECODED PAYLOAD</Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 20, fontWeight: "900" }}>QR decoded</Text>
        <Text style={{ color: theme.colors.textSecondary, lineHeight: 20 }}>{truncateMiddle(payload, 92)}</Text>

        <ServerWakeBanner active={analyze.isPending} />
        <LoadingSteps active={analyze.isPending} />
        {analyze.isPending ? <ActivityIndicator color={theme.colors.accent} /> : null}

        {!result ? (
          <View style={{ gap: 10 }}>
            <Button title="Analyze Risk" onPress={runAnalysis} disabled={analyze.isPending} />
            <Button title="Scan Another" variant="secondary" onPress={onClear} />
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            <RiskBreakdownPanel result={result} />
            {reported ? <Text style={{ color: theme.colors.safe }}>Report queued. SafeScan will use it to improve detection.</Text> : null}
            <Button
              title="Block & Report"
              variant={result.overallRisk === "high" ? "primary" : "secondary"}
              onPress={async () => {
                await reportUrl(result.url, "Mobile user blocked risky QR");
                setReported(true);
              }}
            />
            <Button title="Share Report" variant="secondary" onPress={() => shareScanReport(result)} />
            <Button title="Continue Safely" variant="ghost" onPress={() => Linking.openURL(result.url)} />
            <Button title="Scan Another" variant="secondary" onPress={onClear} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
