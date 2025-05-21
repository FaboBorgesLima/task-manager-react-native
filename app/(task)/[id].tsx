import TaskForm from "@/components/task/TaskForm";
import { useTaskRepository } from "@/store/repositories/task.repository";
import { Task } from "@faboborgeslima/task-manager-domain/dist/task";
import { useNavigation } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function EditTask() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();

    const [taskId, setTaskId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            setTaskId(id as string);
        });
        return () => {
            unsubscribe();
        };
    }, [navigation]);

    return <TaskForm taskId={taskId} />;
}
