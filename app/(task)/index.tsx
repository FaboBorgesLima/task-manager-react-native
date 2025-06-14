import TaskCard from "@/components/task/TaskCard";
import { Rem } from "@/constants/rem";
import { Typo } from "@/constants/typo";

import { useAuthStore } from "@/store/auth.store";
import { useColors } from "@/store/colors";
import { useTaskRepository } from "@/store/repositories/task.repository";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "@faboborgeslima/task-manager-domain/dist/task";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Index() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const authStore = useAuthStore();
    const navigation = useNavigation();
    const router = useRouter();
    const taskRepository = useTaskRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const auth = authStore.auth;
            if (!auth) {
                throw new Error("User not authenticated");
            }

            const tasks = await taskRepository.findByUser(auth.user.id || "");
            setTasks(tasks);
        };

        const unsubscribe = navigation.addListener("focus", () => {
            fetchTasks();
        });

        return () => unsubscribe();
    }, [navigation, refreshing]);

    return (
        <>
            <FlatList
                data={tasks}
                style={{
                    gap: Rem.MEDIUM,
                    flex: 1,
                    flexDirection: "column",
                    padding: Rem.LARGE,
                }}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        setTask={() => {
                            // this forces the FlatList to re-render
                            // and show the updated task list
                            // after a task is created or updated
                            setRefreshing(!refreshing);
                        }}
                    ></TaskCard>
                )}
                keyExtractor={(item) => item.id || ""}
            ></FlatList>
            <Pressable
                style={{
                    backgroundColor: palette.primary,
                    padding: Rem.LARGE,
                    flexDirection: "row",
                    gap: Rem.MEDIUM,
                    justifyContent: "space-between",
                }}
                onPress={() => {
                    router.navigate("/(task)/create");
                }}
            >
                <Text
                    style={{
                        color: palette.primaryContrast,
                        fontSize: Typo.LARGE,
                        fontWeight: "bold",
                    }}
                >
                    Add Task
                </Text>
                <Ionicons
                    name="add"
                    size={Rem.XLARGE}
                    color={palette.primaryContrast}
                />
            </Pressable>
        </>
    );
}
