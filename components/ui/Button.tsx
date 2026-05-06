import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/constants/theme";

type ButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ title, variant = "primary", disabled, style, ...props }: ButtonProps) {
  const backgroundColor = variant === "primary" ? theme.colors.primary : variant === "secondary" ? "rgba(255, 255, 255, 0.04)" : "transparent";
  const borderColor = variant === "ghost" ? theme.colors.border : "transparent";
  const textColor = variant === "primary" ? "#041019" : theme.colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        {
          minHeight: 48,
          borderRadius: theme.radius.card,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 18,
          backgroundColor,
          borderWidth: 1,
          borderColor: variant === "secondary" ? theme.colors.border : borderColor,
          opacity: disabled ? 0.5 : 1
        },
        typeof style === "function" ? style(state) : (style as StyleProp<ViewStyle>)
      ]}
      {...props}
    >
      <Text style={{ color: textColor, fontWeight: "800" }}>{title}</Text>
    </Pressable>
  );
}
