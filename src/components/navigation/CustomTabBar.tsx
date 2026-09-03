import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BottomTabBarProps } from "expo-router/js-tabs";

const BAR_HEIGHT = 72;

export function CustomTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  return (
    <View
      className="absolute left-4 right-4"
      style={{ bottom: insets.bottom + 12 }}
      pointerEvents="box-none"
    >
      <View className="flex-row bg-white rounded-[28px]" style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const label = typeof options.title === "string" ? options.title : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={label}
              className="flex-1 items-center justify-center"
            >
              {options.tabBarIcon?.({
                focused,
                color: focused ? "#6c4ef5" : "#6b7280",
                size: 22,
              })}
              {!focused && (
                <Text className="caption mt-1" numberOfLines={1}>
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: BAR_HEIGHT,
    alignItems: "center",
    paddingHorizontal: 8,
    shadowColor: "#0d132b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
});
