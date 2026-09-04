import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/PrimaryButton";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { posthog } from "@/lib/posthog";
import { Image } from "@/tw/image";

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const lesson = getLessonById(id);
  const language = lesson ? getLanguageById(lesson.languageId) : undefined;

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="h3 text-center">Lesson not found</Text>
          <Pressable onPress={() => router.back()} accessibilityRole="button" className="mt-4">
            <Text className="body-md font-poppins-medium text-lingua-deep-purple">Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const imageUri = lesson.imageUrl ?? `https://picsum.photos/seed/${lesson.id}/600/400`;

  const handleStart = () => {
    posthog?.capture("lesson_start_pressed", {
      lesson_id: lesson.id,
      language_code: lesson.languageId,
    });
    router.push({ pathname: "/ai-teacher", params: { lessonId: lesson.id } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center px-4 pt-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          className="w-10 h-10 items-center justify-center -ml-2"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color="#001328" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-6" showsVerticalScrollIndicator={false}>
        <Image source={{ uri: imageUri }} className="w-full h-48 rounded-3xl" contentFit="cover" />

        {language && <Text className="caption mt-4">{language.name}</Text>}
        <Text className="h2 mt-1">{lesson.title}</Text>
        <Text className="body-md text-text-secondary mt-2">{lesson.goal}</Text>

        <View className="flex-row items-center mt-3">
          <Ionicons name="flash" size={16} color="#ffcb00" />
          <Text className="body-sm ml-1">{lesson.xp} XP</Text>
        </View>

        <Text className="h4 mt-6 mb-2">Vocabulary</Text>
        <View className="gap-2">
          {lesson.vocabulary.map((word) => (
            <View
              key={word.id}
              className="flex-row items-center justify-between bg-surface rounded-2xl px-4 py-3"
            >
              <Text className="body-md font-poppins-medium">{word.term}</Text>
              <Text className="body-sm text-text-secondary">{word.translation}</Text>
            </View>
          ))}
        </View>

        <Text className="h4 mt-6 mb-2">Phrases</Text>
        <View className="gap-2">
          {lesson.phrases.map((phrase) => (
            <View key={phrase.id} className="bg-surface rounded-2xl px-4 py-3">
              <Text className="body-md font-poppins-medium">{phrase.text}</Text>
              <Text className="body-sm text-text-secondary mt-0.5">{phrase.translation}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="px-5 pb-4 pt-2">
        <PrimaryButton label="Start lesson" onPress={handleStart} />
      </View>
    </SafeAreaView>
  );
}
