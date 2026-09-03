import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "@/tw/image";
import { getLanguageById } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";

export default function Home() {
  const router = useRouter();
  const { signOut } = useAuth();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);
  const language = selectedLanguage ? getLanguageById(selectedLanguage) : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 justify-center items-center gap-6">
        <Text className="h1 text-center text-lingua-purple">KobbiRus</Text>
        <View className="items-center gap-2">
          <View className="w-16 h-16 rounded-full overflow-hidden bg-surface">
            <Image source={{ uri: language?.flag }} className="w-full h-full" contentFit="cover" />
          </View>
          <Text className="h4">Learning {language?.name}</Text>
        </View>
        <Pressable
          onPress={() => router.push("/language-selection")}
          className="bg-lingua-purple rounded-full px-6 py-3"
        >
          <Text className="text-white text-sm font-poppins-medium">Choose a language</Text>
        </Pressable>
        <Pressable onPress={() => signOut()} className="bg-lingua-purple rounded-full px-6 py-3">
          <Text className="text-white text-sm font-poppins-medium">Sign out</Text>
        </Pressable>
        <Pressable
          onPress={() => clearSelectedLanguage()}
          className="bg-lingua-purple rounded-full px-6 py-3"
        >
          <Text className="text-white text-sm font-poppins-medium">
            Clear AsyncStorage (testing)
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
