import TaskForm from "@/components/task/TaskForm";
import { useTaskRepository } from "@/store/repositories/task.repository";
import { Task } from "@faboborgeslima/task-manager-domain/dist/task";
import { useNavigation } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function EditTask() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();

    return <TaskForm taskId={id} />;
}
