import "../global.css";

import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { type ReactNode, useEffect, useRef } from "react";

import { posthog } from "../lib/posthog";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function PostHogIdentity({ children }: { children: ReactNode }) {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const identifiedUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!isAuthLoaded || !isUserLoaded) return;

    if (isSignedIn && user?.id) {
      if (identifiedUserId.current !== user.id) {
        posthog?.identify(user.id, {
          $set: {
            ...(user.primaryEmailAddress?.emailAddress
              ? { email: user.primaryEmailAddress.emailAddress }
              : {}),
            ...(user.firstName ? { first_name: user.firstName } : {}),
            ...(user.lastName ? { last_name: user.lastName } : {}),
          },
        });
        identifiedUserId.current = user.id;
      }
      return;
    }

    if (!isSignedIn && identifiedUserId.current !== null) {
      posthog?.reset();
      identifiedUserId.current = null;
    }
  }, [isAuthLoaded, isSignedIn, isUserLoaded, user]);

  return children;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const content = <Stack screenOptions={{ headerShown: false }} />;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>
          <PostHogIdentity>{content}</PostHogIdentity>
        </PostHogProvider>
      ) : (
        content
      )}
    </ClerkProvider>
  );
}
