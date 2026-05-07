import { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { config } from "@/constants/config";
import { theme } from "@/constants/theme";

export function ServerWakeBanner({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(-18);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    const id = setTimeout(() => setVisible(true), config.serverWakeDelayMs);
    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    if (!visible) {
      translateY.value = -18;
      opacity.value = 0;
      return;
    }
    translateY.value = withSpring(0, { damping: 16, stiffness: 180 });
    opacity.value = withTiming(1, { duration: 180 });
  }, [opacity, translateY, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));

  if (!visible) return null;
  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          backgroundColor: theme.colors.risk.card.bg,
          borderColor: "rgba(103, 242, 200, 0.24)",
          borderWidth: 1,
          borderRadius: 8,
          padding: 14,
          shadowColor: "#000",
          shadowOpacity: 0.42,
          shadowRadius: 22,
          elevation: 8
        },
        animatedStyle
      ]}
    >
      <ActivityIndicator color={theme.colors.primary} size="small" />
      <Text style={{ color: theme.colors.textSecondary, flex: 1, lineHeight: 20 }}>
        Waking up the server... this may take 30 seconds.
      </Text>
    </Animated.View>
  );
}
