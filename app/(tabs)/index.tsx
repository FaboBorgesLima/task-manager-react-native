import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="(tabs)"
                options={{
                    tabBarLabel: "Tabs",
                    tabBarIcon: () => (
                        <Ionicons
                            name="accessibility"
                            size={24}
                            color="black"
                        />
                    ),
                }}
            />
        </Stack>
    );
}
