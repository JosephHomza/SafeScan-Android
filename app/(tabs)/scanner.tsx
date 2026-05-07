import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ScanOverlay } from "@/components/scanner/ScanOverlay";
import { ScanDrawer } from "@/components/scanner/ScanDrawer";
import { Button } from "@/components/ui/Button";
import { theme } from "@/constants/theme";

export default function ScannerScreen() {
  const [payload, setPayload] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const insets = useSafeAreaInsets();

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 16, paddingTop: insets.top + 28, paddingBottom: Math.max(insets.bottom, 18) + 18, justifyContent: "center", gap: 16 }}>
        <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, backgroundColor: theme.colors.surface, padding: 22, gap: 14, ...theme.shadows.panel }}>
        <Text style={{ ...theme.typography.eyebrow }}>INTERACTIVE DEMO</Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 32, fontFamily: theme.fonts.sansSemiBold }}>Analyze Payload</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 16, lineHeight: 24 }}>
          Camera access lets SafeScan decode a QR code before any browser, wallet, or payment flow opens.
        </Text>
        <Button title="Grant Camera Access" onPress={requestPermission} />
        <Button title="Try Demo Risk Scan" variant="secondary" onPress={() => setPayload("https://claim-sqr-airdrop.xyz/connect?approve=all")} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ position: "absolute", top: insets.top + 18, left: 16, right: 16, zIndex: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, backgroundColor: "rgba(8,16,29,0.82)", padding: 12 }}>
        <View>
          <Text style={{ ...theme.typography.eyebrow, fontSize: 11 }}>INTERACTIVE DEMO</Text>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontFamily: theme.fonts.sansSemiBold }}>Analyze Payload</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setPayload("https://claim-sqr-airdrop.xyz/connect?approve=all")}
          style={{ borderColor: theme.colors.border, borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          <Text style={{ color: theme.colors.accent, fontFamily: theme.fonts.sansSemiBold }}>Demo</Text>
        </Pressable>
      </View>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={async (event) => {
          if (payload) return;
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setPayload(event.data);
        }}
      >
        <ScanOverlay detected={Boolean(payload)} />
      </CameraView>
      <ScanDrawer payload={payload} onClear={() => setPayload(null)} />
      {!payload ? <Text style={{ position: "absolute", bottom: Math.max(insets.bottom, 20) + 24, alignSelf: "center", color: theme.colors.textSecondary }}>Scan, decode, classify, then safely continue.</Text> : null}
    </View>
  );
}
