import { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { theme } from "@/constants/theme";

export function WalletConnect() {
  const [connected, setConnected] = useState(false);

  return (
    <Card style={{ gap: 10 }}>
      <Text style={{ ...theme.typography.eyebrow, fontSize: 11 }}>step1</Text>
      <Text style={{ color: theme.colors.textPrimary, fontSize: 24, fontFamily: theme.fonts.sansSemiBold }}>Solana wallet</Text>
      <Text style={{ color: theme.colors.textSecondary, lineHeight: 22 }}>
        {connected ? "Demo wallet connected for airdrop eligibility preview." : "Connect a wallet later to associate your SQR airdrop eligibility with a Solana address."}
      </Text>
      {connected ? (
        <View style={{ borderColor: theme.colors.border, borderWidth: 1, borderRadius: 12, padding: 12 }}>
          <Text style={{ color: theme.colors.accent }}>Demo9hQ...SafeScan</Text>
        </View>
      ) : null}
      <Button title={connected ? "Disconnect Wallet" : "Connect Solana Wallet"} variant="secondary" onPress={() => setConnected((value) => !value)} />
    </Card>
  );
}
