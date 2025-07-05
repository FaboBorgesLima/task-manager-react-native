import AddTaskButton from "@/components/task/AddTaskButton";
import TaskCard from "@/components/task/TaskCard";
import TaskList from "@/components/task/TaskList";
import { Rem } from "@/constants/rem";
import { Typo } from "@/constants/typo";

import { useAuthStore } from "@/store/auth.store";
import { useColors } from "@/store/colors";
import { useTaskRepository } from "@/store/repositories/task.repository";
import { Task } from "@faboborgeslima/task-manager-domain/dist/task";
import { TaskService } from "@faboborgeslima/task-manager-domain/dist/task/task.service";
import { AxiosError } from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {
    const authStore = useAuthStore();
    const navigation = useNavigation();
    const router = useRouter();
    const [errors, setErrors] = useState<string[]>([]);
    const taskRepository = useTaskRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);
    const pageSize = 30;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            const auth = authStore.auth;

            if (!auth) {
                throw new Error("User not authenticated");
            }

            const taskService = new TaskService(taskRepository);
            let tasks = [];
            try {
                tasks = await taskService.findByUser(
                    auth.user,
                    auth.user,
                    pageSize,
                    page
                );
            } catch (error) {
                if (error instanceof AxiosError) {
                    setErrors([
                        "Failed to fetch tasks. Please try again later.",
                    ]);
                } else {
                    setErrors([
                        "An unexpected error occurred while fetching tasks",
                    ]);
                }
                return;
            }

            setTasks(tasks);
        };

        const unsubscribe = navigation.addListener("focus", () => {
            console.debug("Fetching tasks on focus");
            fetchTasks();
        });

        return () => unsubscribe();
    }, [navigation, page]);

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: palette.background }]}
        >
            {tasks.length === 0 && (
                <Text style={{ fontSize: Typo.LARGE }}>No tasks found</Text>
            )}
            <FlatList
                data={tasks}
                style={styles.listContainer}
                contentContainerStyle={{
                    gap: Rem.LARGE,
                    paddingVertical: Rem.LARGE,
                }}
                onEndReached={() => {
                    if (tasks.length < pageSize * (page + 1)) return; // No more tasks to load

                    setPage((prevPage) => prevPage + 1);
                }}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        setTask={(task) => {
                            const updatedTasks = tasks.map((t) =>
                                t.id === task.id ? task : t
                            );
                            setTasks(updatedTasks);
                        }}
                    ></TaskCard>
                )}
                keyExtractor={(item) => item.id || ""}
            ></FlatList>
            <View style={styles.buttonContainer}>
                <AddTaskButton
                    onPress={() => {
                        router.push("/(task)/create");
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
    },
    flatList: {
        paddingHorizontal: Rem.LARGE,

        height: "auto",
    },
    buttonContainer: {},
    listContainer: {
        paddingHorizontal: Rem.LARGE,

        height: "auto",
    },
});
