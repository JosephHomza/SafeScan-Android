import { TextInput, type TextInputProps } from "react-native";
import { theme } from "@/constants/theme";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={theme.colors.muted}
      style={{
        minHeight: 48,
        borderRadius: 16,
        borderColor: theme.colors.border,
        borderWidth: 1,
        color: theme.colors.textPrimary,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        paddingHorizontal: 14
      }}
      {...props}
    />
  );
}
