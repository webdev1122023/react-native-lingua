import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContinueLearningCard } from "@/components/home/ContinueLearningCard";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { TodayPlanItem } from "@/components/home/TodayPlanItem";
import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { Image } from "@/tw/image";
import type { ActivityType, LanguageCode } from "@/types/learning";

// Greeting shown in the language the learner is studying, with an English fallback.
const GREETINGS: Partial<Record<LanguageCode, string>> = {
  es: "Hola",
  fr: "Salut",
  de: "Hallo",
  it: "Ciao",
  ja: "Konnichiwa",
  ko: "Annyeong",
  ru: "Privet",
  tw: "Akwaaba",
};

const PLAN_ORDER: ActivityType[] = ["phrase-practice", "conversation", "vocabulary"];

const PLAN_META: Partial<
  Record<ActivityType, { title: string; icon: keyof typeof Ionicons.glyphMap; iconBgClassName: string }>
> = {
  "phrase-practice": { title: "Lesson", icon: "book", iconBgClassName: "bg-lingua-purple" },
  conversation: { title: "AI Conversation", icon: "headset", iconBgClassName: "bg-lingua-purple" },
  vocabulary: { title: "New words", icon: "chatbubble-ellipses", iconBgClassName: "bg-[#FF6B6B]" },
};

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const language = selectedLanguage ? getLanguageById(selectedLanguage) : undefined;

  const { completedActivityIds, xpToday, dailyGoalXp, streak, lastGoalDate, toggleActivity } = useProgressStore();

  const unit = selectedLanguage ? getUnitsByLanguage(selectedLanguage)[0] : undefined;
  const lesson = unit ? getLessonsByUnit(unit.id)[0] : undefined;

  const planItems = useMemo(() => {
    if (!lesson) return [];
    const activities = PLAN_ORDER.map((type) =>
      lesson.activities.find((activity) => activity.type === type)
    ).filter((activity): activity is NonNullable<typeof activity> => !!activity);

    const xpPerActivity = activities.length > 0 ? Math.round(lesson.xp / activities.length) : 0;

    return activities.map((activity) => {
      const meta = PLAN_META[activity.type]!;
      const subtitle =
        activity.type === "vocabulary"
          ? `${lesson.vocabulary.length} words`
          : activity.type === "conversation"
            ? activity.instruction
            : lesson.description;

      return { activity, meta, subtitle, xp: xpPerActivity };
    });
  }, [lesson]);

  const greeting = (selectedLanguage && GREETINGS[selectedLanguage]) ?? "Hi";
  const firstName = user?.firstName ?? "there";

  const handleActivityPress = (activityId: string, activityType: ActivityType, xp: number) => {
    if (completedActivityIds.includes(activityId)) {
      toggleActivity(activityId, xp);
      return;
    }

    const nextXp = xpToday + xp;
    posthog?.capture("learning_activity_completed", {
      activity_type: activityType,
      language_code: selectedLanguage,
      xp_awarded: xp,
      xp_total: nextXp,
    });

    if (nextXp >= dailyGoalXp && lastGoalDate !== new Date().toDateString()) {
      posthog?.capture("daily_goal_reached", {
        daily_goal_xp: dailyGoalXp,
        language_code: selectedLanguage,
        xp_total: nextXp,
      });
    }

    toggleActivity(activityId, xp);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-2 pb-32"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-3">
            <View className="w-11 h-11 rounded-full overflow-hidden bg-surface items-center justify-center">
              {language ? (
                <Image source={{ uri: language.flag }} className="w-full h-full" contentFit="cover" />
              ) : (
                <Ionicons name="earth" size={22} color="#6b7280" />
              )}
            </View>
            <Text className="h4 ml-3 flex-1" numberOfLines={1}>
              {greeting}, {firstName}! 👋
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image source={images.streakFire} className="w-6 h-6" contentFit="contain" />
              <Text className="h4">{streak}</Text>
            </View>
            <Pressable
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              className="active:opacity-70"
            >
              <Ionicons name="notifications-outline" size={22} color="#001328" />
            </Pressable>
          </View>
        </View>

        <View className="mt-5">
          <DailyGoalCard xp={xpToday} goalXp={dailyGoalXp} />
        </View>

        <View className="mt-4">
          {language && unit ? (
            <ContinueLearningCard
              languageName={language.name}
              level="A1"
              unitLabel={`Unit ${unit.order}`}
              onPress={() => router.push("/learn")}
            />
          ) : (
            <View className="bg-surface rounded-3xl px-5 py-6 items-center">
              <Text className="h4 text-center">Lessons coming soon</Text>
              <Text className="body-sm text-text-secondary text-center mt-1">
                {language ? `We're still building ${language.name} content.` : "Choose a language to get started."}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center justify-between mt-6 mb-1">
          <Text className="h3">Today&apos;s plan</Text>
          <Pressable onPress={() => router.push("/learn")} accessibilityRole="button">
            <Text className="body-md font-poppins-medium text-lingua-deep-purple">View all</Text>
          </Pressable>
        </View>

        {planItems.length > 0 ? (
          <View>
            {planItems.map(({ activity, meta, subtitle, xp }) => (
              <TodayPlanItem
                key={activity.id}
                icon={meta.icon}
                iconBgClassName={meta.iconBgClassName}
                title={meta.title}
                subtitle={subtitle}
                completed={completedActivityIds.includes(activity.id)}
                onPress={() => handleActivityPress(activity.id, activity.type, xp)}
              />
            ))}
          </View>
        ) : (
          <Text className="body-sm text-text-secondary mt-2">No lessons planned yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
