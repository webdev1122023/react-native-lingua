import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { posthog } from "@/lib/posthog";
import { useProgressStore } from "@/store/progressStore";
import { Image } from "@/tw/image";

type SessionStatus = "connecting" | "live" | "ended";

const FEEDBACK_STATS = [
  { label: "Speaking", value: "Excellent", className: "text-success" },
  { label: "Pronunciation", value: "Great", className: "text-lingua-blue" },
  { label: "Grammar", value: "Good", className: "text-lingua-blue" },
] as const;

type ControlButtonProps = {
  label: string;
  accessibilityLabel?: string;
  active?: boolean;
  activeBgClassName?: string;
  onPress: () => void;
  children: ReactNode;
};

function ControlButton({
  label,
  accessibilityLabel,
  active,
  activeBgClassName = "bg-lingua-purple/10",
  onPress,
  children,
}: ControlButtonProps) {
  return (
    <View className="items-center">
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ selected: !!active }}
        className={`w-14 h-14 rounded-full items-center justify-center active:opacity-90 ${
          active ? activeBgClassName : "bg-surface"
        }`}
      >
        {children}
      </Pressable>
      <Text className="caption mt-1.5">{label}</Text>
    </View>
  );
}

export default function AiTeacher() {
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();
  const router = useRouter();

  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const language = lesson ? getLanguageById(lesson.languageId) : undefined;

  const [status, setStatus] = useState<SessionStatus>("connecting");
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const hasRequestedCameraPermission = useRef(false);

  const completedActivityIds = useProgressStore((state) => state.completedActivityIds);
  const toggleActivity = useProgressStore((state) => state.toggleActivity);

  const conversationActivity = lesson?.activities.find((activity) => activity.type === "conversation");
  const hasCompletedConversation = conversationActivity
    ? completedActivityIds.includes(conversationActivity.id)
    : false;

  useEffect(() => {
    posthog?.capture("ai_teacher_viewed", { lesson_id: lesson?.id ?? null });
  }, [lesson]);

  useEffect(() => {
    if (!lesson) return;
    const timer = setTimeout(() => setStatus("live"), 1200);
    return () => clearTimeout(timer);
  }, [lesson]);

  useEffect(() => {
    if (!lesson || !cameraPermission || hasRequestedCameraPermission.current) return;
    if (!cameraPermission.granted && cameraPermission.canAskAgain) {
      hasRequestedCameraPermission.current = true;
      requestCameraPermission();
    }
  }, [lesson, cameraPermission, requestCameraPermission]);

  if (!lesson || !language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="flex-1 items-center justify-center px-8">
          <Image source={images.mascotWelcome} className="w-40 h-40" contentFit="contain" />
          <Text className="h3 text-center mt-4">Pick a lesson to meet your AI teacher</Text>
          <Text className="body-sm text-text-secondary text-center mt-2">
            Choose a lesson from Learn to start an audio conversation.
          </Text>
          <Pressable
            onPress={() => router.push("/learn")}
            accessibilityRole="button"
            className="bg-lingua-purple rounded-full px-6 py-3 mt-5 active:opacity-90"
          >
            <Text className="body-md font-poppins-semibold text-white">Go to Learn</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const currentPhrase = lesson.phrases.length > 0 ? lesson.phrases[phraseIndex % lesson.phrases.length] : undefined;

  const handleNextPhrase = () => {
    if (lesson.phrases.length === 0) return;
    setPhraseIndex((index) => (index + 1) % lesson.phrases.length);
  };

  const handleEndCall = () => {
    posthog?.capture("ai_teacher_call_ended", {
      lesson_id: lesson.id,
      language_code: lesson.languageId,
    });

    if (conversationActivity && !hasCompletedConversation) {
      toggleActivity(conversationActivity.id, lesson.xp);
    }

    setStatus("ended");

    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/learn");
    }
  };

  const statusLabel =
    status === "connecting" ? "Connecting…" : status === "live" ? "Online" : "Call ended";
  const statusDotClassName = status === "live" ? "bg-success" : status === "connecting" ? "bg-warning" : "bg-border";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center px-4 pt-2 pb-1">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.push("/learn"))}
          accessibilityRole="button"
          className="w-10 h-10 items-center justify-center -ml-2"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color="#001328" />
        </Pressable>
        <View className="flex-1 ml-1">
          <Text className="h3" numberOfLines={1}>
            {language.name} AI Teacher
          </Text>
          <View className="flex-row items-center mt-0.5">
            <View className={`w-2 h-2 rounded-full mr-1.5 ${statusDotClassName}`} />
            <Text className="body-sm text-text-secondary">{statusLabel}</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="flash" size={16} color="#ffcb00" />
          <Text className="body-sm ml-1">{lesson.xp} XP</Text>
        </View>
      </View>

      <View className="flex-1 px-4 pt-2">
        <View className="flex-1 rounded-3xl overflow-hidden bg-lingua-purple/10">
          <View className="flex-1 items-center justify-center">
            <Image source={images.mascotWelcome} className="w-56 h-56" contentFit="contain" />
          </View>

          <View
            className="absolute top-3 right-3 w-20 h-24 rounded-2xl overflow-hidden bg-text-primary border-2 border-white"
            style={styles.floatingShadow}
          >
            {cameraOn && cameraPermission?.granted ? (
              <CameraView style={styles.cameraFill} facing="front" />
            ) : (
              <Pressable
                onPress={() => (cameraPermission?.granted ? setCameraOn(true) : requestCameraPermission())}
                accessibilityRole="button"
                accessibilityLabel="Enable camera"
                className="flex-1 items-center justify-center px-1"
              >
                <Ionicons name="videocam-off" size={18} color="#ffffff" />
                <Text className="caption text-white text-center mt-1">
                  {cameraPermission?.granted === false && !cameraPermission.canAskAgain
                    ? "Camera blocked"
                    : "Tap to enable"}
                </Text>
              </Pressable>
            )}
            {isMuted && (
              <View className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-error items-center justify-center">
                <Ionicons name="mic-off" size={11} color="#ffffff" />
              </View>
            )}
          </View>

          {currentPhrase && (
            <Pressable
              onPress={handleNextPhrase}
              accessibilityRole="button"
              accessibilityLabel="Next phrase"
              className="absolute left-4 right-4 bottom-4 bg-white rounded-2xl px-4 py-3.5"
              style={styles.floatingShadow}
            >
              <View className="flex-row items-start">
                <View className="flex-1 pr-3">
                  <Text className="h4">{currentPhrase.text}</Text>
                  {subtitlesOn && (
                    <Text className="body-sm text-text-secondary mt-1">{currentPhrase.translation}</Text>
                  )}
                </View>
                <Ionicons name="volume-high" size={20} color="#5b3bf6" />
              </View>
              <View className="absolute -bottom-1.5 left-8 w-3.5 h-3.5 bg-white rotate-45" />
            </Pressable>
          )}
        </View>

        <View className="flex-row items-center justify-between px-4 mt-5">
          <ControlButton
            label="Camera"
            accessibilityLabel={cameraOn ? "Turn camera off" : "Turn camera on"}
            active={cameraOn && cameraPermission?.granted}
            onPress={() => {
              if (!cameraPermission?.granted) {
                requestCameraPermission();
                return;
              }
              setCameraOn((on) => !on);
            }}
          >
            <Ionicons
              name={cameraOn && cameraPermission?.granted ? "videocam" : "videocam-off"}
              size={24}
              color={cameraOn && cameraPermission?.granted ? "#5b3bf6" : "#001328"}
            />
          </ControlButton>

          <ControlButton
            label={isMuted ? "Muted" : "Mic"}
            accessibilityLabel={isMuted ? "Unmute microphone" : "Mute microphone"}
            active={isMuted}
            activeBgClassName="bg-error/10"
            onPress={() => setIsMuted((muted) => !muted)}
          >
            <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color={isMuted ? "#ff4d4f" : "#001328"} />
          </ControlButton>

          <ControlButton
            label="Subtitles"
            accessibilityLabel={subtitlesOn ? "Hide subtitles" : "Show subtitles"}
            active={subtitlesOn}
            onPress={() => setSubtitlesOn((on) => !on)}
          >
            <MaterialCommunityIcons
              name={subtitlesOn ? "subtitles" : "subtitles-outline"}
              size={24}
              color={subtitlesOn ? "#5b3bf6" : "#001328"}
            />
          </ControlButton>

          <View className="items-center">
            <Pressable
              onPress={handleEndCall}
              accessibilityRole="button"
              accessibilityLabel="End call"
              className="w-14 h-14 rounded-full bg-error items-center justify-center active:opacity-90"
              style={styles.endCallShadow}
            >
              <MaterialCommunityIcons name="phone-hangup" size={24} color="#ffffff" />
            </Pressable>
            <Text className="caption mt-1.5">End Call</Text>
          </View>
        </View>

        <View className="flex-row bg-white border border-border rounded-3xl px-4 py-4 mt-5 mb-28">
          {FEEDBACK_STATS.map((stat, index) => (
            <View key={stat.label} className={`flex-1 items-center ${index > 0 ? "border-l border-border" : ""}`}>
              <Text className="body-sm text-text-secondary">{stat.label}</Text>
              <Text className={`h4 mt-1 ${stat.className}`}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameraFill: {
    flex: 1,
  },
  floatingShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  endCallShadow: {
    shadowColor: "#ff4d4f",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});
