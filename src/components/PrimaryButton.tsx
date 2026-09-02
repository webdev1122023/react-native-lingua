import { Pressable, StyleSheet, Text } from "react-native";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      className="bg-lingua-purple rounded-full h-16 items-center justify-center active:opacity-90"
      style={[styles.shadow, disabled && styles.disabled]}
    >
      <Text className="text-white text-base font-poppins-semibold">{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#5b3bf6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  disabled: {
    opacity: 0.5,
  },
});
