import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";
import { Image } from "@/tw/image";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-center gap-2 mt-2">
          <Image
            source={images.mascotLogo}
            className="w-9 h-9"
            contentFit="contain"
          />
          <Text className="h2">KobbiRus</Text>
        </View>

        <View className="mt-10">
          <Text className="h1">
            Your AI language <Text className="text-lingua-purple">teacher.</Text>
          </Text>
          <Text className="text-sm leading-5 font-poppins text-text-secondary mt-3">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="w-[86%] aspect-square relative">
            <View className="absolute -top-[15%] -left-[10%] bg-[#e7ecfb] rounded-2xl px-4 py-2">
              <Text className="text-sm font-poppins text-text-primary">Hello!</Text>
            </View>
            <View className="absolute -top-[20%] -right-[10%] bg-[#ece7fd] rounded-2xl px-4 py-2">
              <Text className="text-sm font-poppins italic text-lingua-deep-purple">¡Hola!</Text>
            </View>
            <View className="absolute top-[10%] -right-[16%] bg-[#fdeae3] rounded-2xl px-4 py-2">
              <Text className="text-sm font-poppins text-[#e2543e]">你好!</Text>
            </View>
            <View className="absolute top-[58%] -left-[10%] bg-[#e5f6ec] rounded-2xl px-4 py-2">
              <Text className="text-sm font-poppins text-[#1f9d5c]">Привет!</Text>
            </View>
            <View className="absolute top-[72%] -right-[8%] bg-[#fff4d6] rounded-2xl px-4 py-2">
              <Text className="text-sm font-poppins text-[#c98a02]">Akwaaba</Text>
            </View>

            <Image
              source={images.mascotWelcome}
              className="w-full h-full"
              contentFit="contain"
            />
          </View>
        </View>

        <Pressable
          onPress={() => {
            posthog?.capture("onboarding_get_started_tapped");
            router.push("/sign-up");
          }}
          className="bg-lingua-purple rounded-full h-16 items-center justify-center mb-6 active:opacity-90"
          style={styles.buttonShadow}
        >
          <Text className="text-white text-base font-poppins-semibold">
            Get Started
          </Text>
          <Text className="absolute right-6 text-white text-xl">›</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: "#5b3bf6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
});
