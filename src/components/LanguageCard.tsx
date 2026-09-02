import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Image } from "@/tw/image";
import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`flex-row items-center rounded-2xl border px-4 py-3 active:opacity-90 ${
        selected ? "border-lingua-purple bg-lingua-purple/5" : "border-border"
      }`}
    >
      <View className="w-11 h-11 rounded-full overflow-hidden bg-surface">
        <Image
          source={{ uri: language.flag }}
          className="w-full h-full"
          contentFit="cover"
        />
      </View>
      <View className="flex-1 ml-3">
        <Text className="h4">{language.name}</Text>
        <Text className="text-sm font-poppins text-text-secondary mt-0.5">
          {language.nativeName}
        </Text>
      </View>
      {selected ? (
        <Ionicons name="checkmark-circle" size={24} color="#5b3bf6" />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </Pressable>
  );
}
