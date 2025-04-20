import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="test"
                options={{
                    headerShown: false,
                    title: "Test",
                }}
            />
        </Stack>
    );
}
