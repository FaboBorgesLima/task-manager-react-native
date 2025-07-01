import { useColors } from "@/store/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
    const palette = useColors((state) => state.palette);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                header: () => null,
                tabBarStyle: {
                    backgroundColor: palette.secondary,
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: palette.secondaryContrast,
            }}
            initialRouteName="index"
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tasks",
                    tabBarIcon: ({ color }) => {
                        return <Ionicons name="list" size={32} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Add Task",
                    href: null,
                }}
            />
            <Tabs.Screen name="[id]" options={{ href: null, title: "Task" }} />
        </Tabs>
    );
}
