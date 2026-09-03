import { Text, View } from "react-native";

import { images } from "@/constants/images";
import { Image } from "@/tw/image";

type DailyGoalCardProps = {
  xp: number;
  goalXp: number;
};

export function DailyGoalCard({ xp, goalXp }: DailyGoalCardProps) {
  const progress = goalXp > 0 ? Math.min(xp / goalXp, 1) : 0;

  return (
    <View className="flex-row items-center bg-[#FCEEE1] rounded-3xl pl-5 pr-2 py-4">
      <View className="flex-1">
        <Text className="body-md text-text-secondary">Daily goal</Text>
        <Text className="h2 mt-1">
          {xp} <Text className="h4 text-text-secondary">/ {goalXp} XP</Text>
        </Text>
        <View className="h-2 rounded-full bg-[#F3DDC0] mt-3 overflow-hidden">
          <View className="h-2 rounded-full bg-streak" style={{ width: `${progress * 100}%` }} />
        </View>
      </View>
      <Image source={images.treasure} className="w-20 h-20" contentFit="contain" />
    </View>
  );
}
