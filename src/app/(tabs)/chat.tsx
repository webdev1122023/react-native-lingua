import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 justify-center items-center">
        <Text className="h3">Chat — coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
