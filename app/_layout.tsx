import Header from "@/components/Header";
import { useColors } from "@/store/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: Header,
            }}
            initialRouteName="(auth)/login"
        ></Stack>
    );
}
