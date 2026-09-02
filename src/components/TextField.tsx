import { useState } from "react";
import type { TextInputProps } from "react-native";
import { Pressable, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type TextFieldProps = Pick<
  TextInputProps,
  "value" | "onChangeText" | "keyboardType" | "autoCapitalize" | "autoComplete" | "textContentType"
> & {
  label: string;
  isPassword?: boolean;
};

export function TextField({ label, isPassword, ...inputProps }: TextFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const secure = isPassword && !revealed;

  return (
    <View className="flex-row items-center border border-border rounded-2xl px-4 py-3">
      <View className="flex-1">
        <Text className="caption text-text-secondary">{label}</Text>
        <TextInput
          className="font-poppins text-base text-text-primary p-0 mt-1"
          placeholderTextColor="#9ca3af"
          secureTextEntry={secure}
          accessibilityLabel={label}
          {...inputProps}
        />
      </View>
      {isPassword && (
        <Pressable
          onPress={() => setRevealed((v) => !v)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={secure ? "Show password" : "Hide password"}
        >
          <FontAwesome name={secure ? "eye" : "eye-slash"} size={18} color="#6b7280" />
        </Pressable>
      )}
    </View>
  );
}
