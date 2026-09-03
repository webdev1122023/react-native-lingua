import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useLanguageStore } from "@/store/languageStore";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!isLoaded || !hasHydrated) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#5b3bf6" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  return <Redirect href="/home" />;
}
