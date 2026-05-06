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
      <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 18, paddingTop: insets.top + 24, paddingBottom: Math.max(insets.bottom, 18) + 18, justifyContent: "center", gap: 16 }}>
        <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: "900", letterSpacing: 1.8 }}>INTERACTIVE DEMO</Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 32, fontWeight: "900" }}>Analyze Payload</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 16, lineHeight: 24 }}>
          Camera access lets SafeScan decode a QR code before any browser, wallet, or payment flow opens.
        </Text>
        <Button title="Grant Camera Access" onPress={requestPermission} />
        <Button title="Try Demo Risk Scan" variant="secondary" onPress={() => setPayload("https://claim-sqr-airdrop.xyz/connect?approve=all")} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ position: "absolute", top: insets.top + 12, left: 16, right: 16, zIndex: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: theme.colors.accent, fontSize: 11, fontWeight: "900", letterSpacing: 1.5 }}>INTERACTIVE DEMO</Text>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: "900" }}>Analyze Payload</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setPayload("https://claim-sqr-airdrop.xyz/connect?approve=all")}
          style={{ borderColor: theme.colors.border, borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "rgba(7, 7, 10, 0.72)" }}
        >
          <Text style={{ color: theme.colors.accent, fontWeight: "800" }}>Demo</Text>
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
