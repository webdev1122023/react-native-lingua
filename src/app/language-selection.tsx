import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageCard } from "@/components/LanguageCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { Image } from "@/tw/image";
import type { LanguageCode } from "@/types/learning";

export default function LanguageSelection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<LanguageCode | null>(null);

  const filteredLanguages = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return languages;
    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(search) ||
        language.nativeName.toLowerCase().includes(search)
    );
  }, [query]);

  const handleConfirm = () => {
    if (!selectedId) return;
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center px-4 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center -ml-2"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color="#001328" />
        </Pressable>
        <Text className="h3 flex-1 text-center mr-10">Choose a language</Text>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-6" keyboardShouldPersistTaps="handled">
        <View className="px-6">
          <View className="flex-row items-center border border-border rounded-full px-4 h-12 mt-4 bg-surface">
            <Ionicons name="search" size={18} color="#6b7280" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search languages"
              placeholderTextColor="#9ca3af"
              className="flex-1 ml-2 font-poppins text-sm text-text-primary p-0"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Search languages"
            />
          </View>

          <Text className="h4 mt-6 mb-3">Popular</Text>

          <View className="gap-3">
            {filteredLanguages.map((language) => (
              <LanguageCard
                key={language.id}
                language={language}
                selected={selectedId === language.id}
                onPress={() => setSelectedId(language.id)}
              />
            ))}
            {filteredLanguages.length === 0 && (
              <Text className="text-sm font-poppins text-text-secondary text-center mt-6">
                No languages found.
              </Text>
            )}
          </View>

          <View className="mt-6">
            <PrimaryButton label="Confirm" onPress={handleConfirm} disabled={!selectedId} />
          </View>
        </View>

        <Image source={images.earth} className="w-full h-80 mt-6" contentFit="cover" />
      </ScrollView>
    </SafeAreaView>
  );
}
