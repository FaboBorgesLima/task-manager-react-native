import Header from "@/components/Header";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <Header {...props} />,
            }}
            initialRouteName="(auth)/login"
        ></Stack>
    );
}
