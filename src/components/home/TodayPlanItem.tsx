import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type TodayPlanItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBgClassName: string;
  title: string;
  subtitle: string;
  completed: boolean;
  onPress: () => void;
};

export function TodayPlanItem({
  icon,
  iconBgClassName,
  title,
  subtitle,
  completed,
  onPress,
}: TodayPlanItemProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ checked: completed }}
      className="flex-row items-center py-2.5 active:opacity-80"
    >
      <View className={`w-11 h-11 rounded-2xl items-center justify-center ${iconBgClassName}`}>
        <Ionicons name={icon} size={20} color="#ffffff" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="h4">{title}</Text>
        <Text className="body-sm text-text-secondary mt-0.5" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {completed ? (
        <View className="w-7 h-7 rounded-full bg-lingua-deep-purple items-center justify-center">
          <Ionicons name="checkmark" size={16} color="#ffffff" />
        </View>
      ) : (
        <View className="w-7 h-7 rounded-full border-2 border-border" />
      )}
    </Pressable>
  );
}
