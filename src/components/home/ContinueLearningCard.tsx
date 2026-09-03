import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import { images } from "@/constants/images";
import { Image } from "@/tw/image";

type ContinueLearningCardProps = {
  languageName: string;
  level: string;
  unitLabel: string;
  onPress: () => void;
};

export function ContinueLearningCard({
  languageName,
  level,
  unitLabel,
  onPress,
}: ContinueLearningCardProps) {
  return (
    <LinearGradient
      colors={["#6C4EF5", "#5B3BF6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 24, overflow: "hidden" }}
    >
      <View className="flex-row items-end pl-5 pr-1 py-5">
        <View className="flex-1">
          <Text className="body-md text-white/80">Continue learning</Text>
          <Text className="h2 text-white mt-1">{languageName}</Text>
          <Text className="body-sm text-white/70 mt-0.5">
            {level} • {unitLabel}
          </Text>
          <Pressable
            onPress={onPress}
            accessibilityRole="button"
            className="bg-white rounded-full self-start px-5 py-2.5 mt-4 active:opacity-90"
          >
            <Text className="body-md font-poppins-semibold text-lingua-deep-purple">
              Continue
            </Text>
          </Pressable>
        </View>
        <Image source={images.palace} className="w-40 h-40 -mb-3" contentFit="contain" />
      </View>
    </LinearGradient>
  );
}
