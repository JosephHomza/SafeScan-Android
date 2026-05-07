import { Text, View } from "react-native";

type Severity = "low" | "medium" | "high";

const severityStyles: Record<Severity, { dot: string; badge: string; text: string; label: string }> = {
  low: {
    dot: "bg-safe",
    badge: "border-risk-safe-border bg-risk-safe-bg",
    text: "text-risk-safe-text",
    label: "LOW"
  },
  medium: {
    dot: "bg-warn",
    badge: "border-risk-warn-border bg-risk-warn-bg",
    text: "text-risk-warn-text",
    label: "MED"
  },
  high: {
    dot: "bg-danger",
    badge: "border-risk-danger-border bg-risk-danger-bg",
    text: "text-risk-danger-text",
    label: "HIGH"
  }
};

export function SignalRow({ label, severity }: { label: string; severity: Severity }) {
  const styles = severityStyles[severity];

  return (
    <View className="flex-row items-center gap-3 rounded-web border border-border bg-surface px-4 py-3">
      <View className={`h-2.5 w-2.5 rounded-pill ${styles.dot}`} />
      <Text className="flex-1 font-ui text-base text-textPrimary" numberOfLines={2}>
        {label}
      </Text>
      <View className={`rounded-pill border px-3 py-1 ${styles.badge}`}>
        <Text className={`font-semibold text-xs ${styles.text}`}>{styles.label}</Text>
      </View>
    </View>
  );
}
