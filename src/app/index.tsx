import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#5b3bf6" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 justify-center items-center gap-6">
      <Text className="h1 text-center text-lingua-purple">
        KobbiRus
      </Text>
      <Pressable
        onPress={() => signOut()}
        className="bg-lingua-purple rounded-full px-6 py-3"
      >
        <Text className="text-white text-sm font-poppins-medium">Sign out</Text>
      </Pressable>
    </View>
  );
}
