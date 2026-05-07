import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAnalyze } from "@/hooks/useAnalyze";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RiskBreakdownPanel } from "@/components/risk/RiskBreakdownPanel";
import { LoadingSteps } from "@/components/shared/LoadingSteps";
import { theme } from "@/constants/theme";
import { useScanStore } from "@/stores/scanStore";
import { shareScanReport } from "@/utils/sharing";

export default function AnalyzeScreen() {
  const [url, setUrl] = useState("");
  const insets = useSafeAreaInsets();
  const analyze = useAnalyze();
  const addScan = useScanStore((state) => state.addScan);

  const submit = (input = url) => {
    analyze.mutate(input, {
      onSuccess: (scan) => addScan({ ...scan, id: `${Date.now()}` })
    });
  };

  const samples = [
    "https://safescan-qr.onrender.com",
    "https://claim-sqr-airdrop.xyz/connect?approve=all",
    "https://bit.ly/sqr-wallet-claim"
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: insets.top + 28, gap: 18, paddingBottom: Math.max(insets.bottom, 20) + 36 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ ...theme.typography.eyebrow }}>INTERACTIVE DEMO</Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 30, fontFamily: theme.fonts.sansSemiBold }}>Analyze Payload</Text>
        <Text style={{ color: theme.colors.textSecondary, lineHeight: 22 }}>
          Paste a QR destination, wallet link, or payment URL. SafeScan checks the payload before anything opens.
        </Text>
      </View>

      <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, backgroundColor: theme.colors.surfaceElevated, padding: 22, gap: 14 }}>
        <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold }}>Or paste a URL manually</Text>
        <Input value={url} onChangeText={setUrl} placeholder="https://example.com" autoCapitalize="none" keyboardType="url" />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Button title="Analyze URL" onPress={() => submit()} disabled={!url || analyze.isPending} />
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={async () => {
              const pasted = await Clipboard.getStringAsync();
              setUrl(pasted);
            }}
            style={{ minWidth: 82, borderColor: theme.colors.border, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold }}>Paste</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ ...theme.typography.eyebrow, fontSize: 11 }}>SAMPLE PAYLOADS</Text>
        {samples.map((sample) => (
          <Pressable key={sample} onPress={() => { setUrl(sample); submit(sample); }} style={{ borderColor: theme.colors.border, borderWidth: 1, borderRadius: 8, padding: 12, backgroundColor: "rgba(255,255,255,0.05)" }}>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fonts.mono }}>{sample}</Text>
          </Pressable>
        ))}
      </View>

      <LoadingSteps active={analyze.isPending} />
      {analyze.isPending ? <ActivityIndicator color={theme.colors.accent} /> : null}
      {analyze.error ? <Text style={{ color: theme.colors.danger }}>{String(analyze.error.message ?? analyze.error)}</Text> : null}
      {analyze.data ? (
        <View style={{ gap: 12 }}>
          <RiskBreakdownPanel result={analyze.data} />
          <Button title="Share Report" variant="secondary" onPress={() => analyze.data && shareScanReport(analyze.data)} />
        </View>
      ) : null}
    </ScrollView>
  );
}
