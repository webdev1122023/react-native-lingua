import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type SocialButtonProps = {
  label: string;
  icon: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

export function SocialButton({ label, icon, onPress, disabled }: SocialButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      className={`relative flex-row items-center justify-center h-14 border border-border rounded-2xl bg-white active:opacity-70 ${
        disabled ? "opacity-40" : ""
      }`}
    >
      <View className="absolute left-5">{icon}</View>
      <Text className="font-poppins-medium text-base text-text-primary">{label}</Text>
    </Pressable>
  );
}
