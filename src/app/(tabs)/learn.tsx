import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LessonCard, type LessonStatus } from "@/components/LessonCard";
import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { Image } from "@/tw/image";
import type { Lesson } from "@/types/learning";

type LessonEntry = {
  lesson: Lesson;
  status: LessonStatus;
  completedSteps: number;
  totalSteps: number;
};

export default function Learn() {
  const router = useRouter();
  const [tab, setTab] = useState<"lessons" | "practice">("lessons");
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedActivityIds = useProgressStore((state) => state.completedActivityIds);

  const language = selectedLanguage ? getLanguageById(selectedLanguage) : undefined;
  const unit = selectedLanguage ? getUnitsByLanguage(selectedLanguage)[0] : undefined;

  const lessonEntries: LessonEntry[] = useMemo(() => {
    const lessons = unit ? getLessonsByUnit(unit.id) : [];
    return lessons.map((lesson) => {
      const activityIds = lesson.activities.map((activity) => activity.id);
      const completedSteps = activityIds.filter((id) => completedActivityIds.includes(id)).length;
      const status: LessonStatus =
        completedSteps === 0
          ? "not-started"
          : completedSteps === activityIds.length
            ? "completed"
            : "in-progress";
      return { lesson, status, completedSteps, totalSteps: activityIds.length };
    });
  }, [unit, completedActivityIds]);

  const completedCount = lessonEntries.filter((entry) => entry.status === "completed").length;
  const currentEntry =
    lessonEntries.find((entry) => entry.status === "in-progress") ??
    lessonEntries.find((entry) => entry.status === "not-started") ??
    lessonEntries[lessonEntries.length - 1];

  const handleLessonPress = (lesson: Lesson) => {
    posthog?.capture("lesson_opened", {
      lesson_id: lesson.id,
      language_code: lesson.languageId,
    });
    router.push({ pathname: "/lesson/[id]", params: { id: lesson.id } });
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/home");
    }
  };

  if (!selectedLanguage || !language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="h3 text-center">Choose a language to start learning</Text>
          <Text className="body-sm text-text-secondary text-center mt-2">
            Pick a language and we&apos;ll show your lessons here.
          </Text>
          <Pressable
            onPress={() => router.push("/language-selection")}
            accessibilityRole="button"
            className="bg-lingua-purple rounded-full px-6 py-3 mt-5 active:opacity-90"
          >
            <Text className="body-md font-poppins-semibold text-white">Choose language</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!unit || !currentEntry) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="flex-row items-center px-5 pt-1">
          <View className="w-11 h-11 rounded-full overflow-hidden bg-surface items-center justify-center">
            <Image source={{ uri: language.flag }} className="w-full h-full" contentFit="cover" />
          </View>
          <Text className="h2 ml-3">{language.name}</Text>
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="h4 text-center">Lessons coming soon</Text>
          <Text className="body-sm text-text-secondary text-center mt-1">
            We&apos;re still building {language.name} content.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const heroImageSource = currentEntry.lesson.imageUrl
    ? { uri: currentEntry.lesson.imageUrl }
    : images.mascotWelcome;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center px-4 pt-1">
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          className="w-10 h-10 items-center justify-center -ml-2"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color="#001328" />
        </Pressable>
        <View className="flex-1 mx-1">
          <Text className="h3" numberOfLines={1}>
            {currentEntry.lesson.title}
          </Text>
          <Text className="body-sm text-text-secondary mt-0.5">
            Unit {unit.order} • {completedCount}/{lessonEntries.length} lessons
          </Text>
        </View>
        <Ionicons name="bookmark-outline" size={22} color="#ff8a00" />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-10" showsVerticalScrollIndicator={false}>
        <View className="w-full h-64 mt-3 bg-lingua-purple/10 items-center justify-center overflow-hidden">
          <Image source={heroImageSource} className="w-56 h-56" contentFit="contain" />
        </View>

        <View className="mx-5 -mt-7" style={styles.tabCardShadow}>
          <View className="flex-row bg-white rounded-3xl px-2 pt-3">
            <Pressable
              onPress={() => setTab("lessons")}
              accessibilityRole="button"
              accessibilityState={{ selected: tab === "lessons" }}
              className="flex-1 items-center pb-2.5"
            >
              <Text className={tab === "lessons" ? "h4 text-lingua-deep-purple" : "h4 text-text-secondary"}>
                Lessons
              </Text>
              {tab === "lessons" && <View className="h-1 w-10 rounded-full bg-lingua-blue mt-1.5" />}
            </Pressable>
            <Pressable
              onPress={() => setTab("practice")}
              accessibilityRole="button"
              accessibilityState={{ selected: tab === "practice" }}
              className="flex-1 items-center pb-2.5"
            >
              <Text className={tab === "practice" ? "h4 text-lingua-deep-purple" : "h4 text-text-secondary"}>
                Practice
              </Text>
              {tab === "practice" && <View className="h-1 w-10 rounded-full bg-lingua-blue mt-1.5" />}
            </Pressable>
          </View>
        </View>

        <View className="px-5 mt-4">
          {tab === "lessons" ? (
            lessonEntries.map(({ lesson, status, completedSteps, totalSteps }) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                status={status}
                completedSteps={completedSteps}
                totalSteps={totalSteps}
                onPress={() => handleLessonPress(lesson)}
              />
            ))
          ) : (
            <View className="bg-surface rounded-3xl px-5 py-8 items-center">
              <Text className="h4 text-center">Practice mode coming soon</Text>
              <Text className="body-sm text-text-secondary text-center mt-1">
                Review past lessons and vocabulary here soon.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabCardShadow: {
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
});
