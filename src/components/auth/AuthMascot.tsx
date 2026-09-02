import { Text, View } from "react-native";

import { images } from "@/constants/images";
import { Image } from "@/tw/image";

export function AuthMascot() {
  return (
    <View className="items-center justify-center my-4">
      <View className="w-56 h-56 items-center justify-center relative">
        <Text className="absolute top-2 left-6 text-lg text-streak">✦</Text>
        <Text className="absolute top-14 right-4 text-base text-lingua-blue">✦</Text>
        <Text className="absolute bottom-10 right-0 text-sm text-warning">✦</Text>
        <Image source={images.mascotAuth} className="w-48 h-48" contentFit="contain" />
      </View>
    </View>
  );
}
