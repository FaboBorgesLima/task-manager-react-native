import {
    Task,
    TaskStatus,
} from "@faboborgeslima/task-manager-domain/dist/task";
import { TaskService } from "@faboborgeslima/task-manager-domain/dist/task/task.service";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Rem } from "@/constants/rem";
import { Typo } from "@/constants/typo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TimeSpan from "../TimeSpan";
import TaskStatusBadge from "./TaskStatusBadge";
import { useTaskRepository } from "@/store/repositories/task.repository";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Card } from "../Card";
import { useColors } from "@/store/colors";

export default function TaskCard({
    task,
    setTask,
}: {
    task: Task;
    setTask: (task: Task) => void;
}) {
    const router = useRouter();
    const taskRepository = useTaskRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);

    const [taskService, setTaskService] = useState(
        new TaskService(taskRepository)
    );

    const auth = useAuthStore((state) => state.auth);

    const onPress = () => {
        router.navigate({
            pathname: "/(task)/[id]",
            params: { id: task.id ?? "" },
        });
    };

    useEffect(() => {
        setTaskService(new TaskService(taskRepository));
    }, [taskRepository]);

    return (
        <Card style={{ padding: Rem.LARGE }}>
            <View style={styleSheet.container}>
                <View style={styleSheet.bodyContainer}>
                    <Text style={{ fontSize: Typo.MEDIUM, fontWeight: "bold" }}>
                        {task.title}
                    </Text>
                    {task.isEntireDay ? (
                        <View style={styleSheet.textIconContainer}>
                            <Ionicons name="calendar" size={Rem.LARGE} />
                            <Text>{task.start.toLocaleDateString()}</Text>
                        </View>
                    ) : (
                        <View>
                            <View style={styleSheet.textIconContainer}>
                                <Ionicons name="calendar" size={Rem.LARGE} />
                                <Text>{task.start.toLocaleDateString()}</Text>
                            </View>
                            <TimeSpan start={task.start} end={task.end} />
                        </View>
                    )}

                    {task.description && (
                        <Text style={{ fontSize: 16 }}>{task.description}</Text>
                    )}
                </View>
                <View style={styleSheet.commandsContainer}>
                    <Pressable
                        onPress={async () => {
                            if (!auth) {
                                throw new Error("User not authenticated");
                            }
                            task.status =
                                task.status === TaskStatus.COMPLETED
                                    ? TaskStatus.PENDING
                                    : TaskStatus.COMPLETED;
                            const updatedTask = await taskService.save(
                                auth.user,
                                task
                            );
                            setTask(updatedTask);
                        }}
                    >
                        <TaskStatusBadge status={task.status} />
                    </Pressable>
                    <Pressable
                        onPress={onPress}
                        style={[
                            styleSheet.editButton,
                            { backgroundColor: palette.primary },
                        ]}
                    >
                        <Text
                            style={[
                                styleSheet.editButtonText,
                                { color: palette.primaryContrast },
                            ]}
                        >
                            edit
                        </Text>
                        <Ionicons
                            name="pencil"
                            size={Rem.LARGE}
                            color={palette.primaryContrast}
                        />
                    </Pressable>
                </View>
            </View>
        </Card>
    );
}

const styleSheet = StyleSheet.create({
    bodyContainer: {
        display: "flex",
        flexDirection: "column",
        gap: Rem.MEDIUM,
        width: "66%",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        gap: Rem.SMALL,
    },
    textIconContainer: {
        display: "flex",
        flexDirection: "row",
        gap: Rem.MEDIUM,
    },
    commandsContainer: {
        width: "34%",
        display: "flex",
        flexDirection: "column",
        gap: Rem.MEDIUM,
    },
    editButton: {
        padding: Rem.MEDIUM,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: Rem.SMALL,
        justifyContent: "center",
        borderRadius: Rem.LARGE,
    },
    editButtonText: {
        fontSize: Typo.MEDIUM,
    },
});
