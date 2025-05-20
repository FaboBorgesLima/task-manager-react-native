import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Tabs.Screen
                name="form"
                options={{
                    title: "Add Task",
                    tabBarIcon: () => {
                        return <Ionicons name="accessibility" size={32} />;
                    },
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Task List",
                    tabBarIcon: () => {
                        return <Ionicons name="list" size={32} />;
                    },
                }}
            />
        </Tabs>
    );
}
