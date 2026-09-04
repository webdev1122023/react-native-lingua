import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { images } from "@/constants/images";
import { Image } from "@/tw/image";
import type { Lesson } from "@/types/learning";

export type LessonStatus = "completed" | "in-progress" | "not-started";

type LessonCardProps = {
  lesson: Lesson;
  status: LessonStatus;
  completedSteps: number;
  totalSteps: number;
  onPress: () => void;
};

export function LessonCard({ lesson, status, completedSteps, totalSteps, onPress }: LessonCardProps) {
  const isActive = status === "in-progress";
  const isCompleted = status === "completed";
  const imageSource = lesson.imageUrl ? { uri: lesson.imageUrl } : images.mascotAuth;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ checked: isCompleted, selected: isActive }}
      className={`flex-row items-center rounded-2xl px-4 py-3.5 mb-3 active:opacity-90 ${
        isActive ? "border-2 border-lingua-purple bg-lingua-purple/5" : "border border-border bg-white"
      }`}
    >
      <View className="flex-1">
        <Text className={`caption ${isActive ? "text-lingua-deep-purple" : "text-text-secondary"}`}>
          Lesson {lesson.order}
        </Text>
        <Text className={`h4 mt-0.5 ${isActive ? "text-lingua-deep-purple" : ""}`} numberOfLines={1}>
          {lesson.title}
        </Text>
        {isActive && <Text className="body-sm text-lingua-deep-purple mt-0.5">In progress</Text>}
        {status === "not-started" && (
          <Text className="body-sm text-text-secondary mt-0.5">
            {completedSteps} / {totalSteps} steps
          </Text>
        )}
      </View>

      {isCompleted ? (
        <View className="w-9 h-9 rounded-full bg-success items-center justify-center">
          <Ionicons name="checkmark" size={18} color="#ffffff" />
        </View>
      ) : isActive ? (
        <View className="w-12 h-12 rounded-2xl overflow-hidden bg-lingua-purple/10 items-center justify-center ml-2">
          <Image source={imageSource} className="w-full h-full" contentFit="contain" />
        </View>
      ) : (
        <View className="w-9 h-9 rounded-full border-2 border-border items-center justify-center">
          <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
        </View>
      )}
    </Pressable>
  );
}
