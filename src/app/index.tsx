import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-6">
      <Text className="h1 text-center text-lingua-purple">
        KobbiRus
      </Text>
      <Link
        href="/onboarding"
        className="bg-lingua-purple rounded-full px-6 py-3 text-white text-sm font-poppins-medium"
      >
        View Onboarding
      </Link>
    </View>
  );
}
