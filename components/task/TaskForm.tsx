import { Card } from "@/components/Card";
import useFormStyleSheet from "@/style/getFormStyleSheet";
import { useAuthStore } from "@/store/auth.store";
import { useTaskRepository } from "@/store/repositories/task.repository";
import {
    Task,
    TaskStatus,
} from "@faboborgeslima/task-manager-domain/dist/task";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useColors } from "@/store/colors";
import { useRouter } from "expo-router";

export default function TaskForm(props: { taskId?: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(TaskStatus.PENDING);
    const [end, setEnd] = useState(new Date());
    const [start, setStart] = useState(new Date());

    const authStore = useAuthStore();
    const taskRepository = useTaskRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);
    const formStyleSheet = useFormStyleSheet(palette);

    const router = useRouter();

    const onSubmit = async () => {
        const auth = authStore.auth;
        if (!auth) {
            throw new Error("User not authenticated");
        }

        const task = Task.make({
            title,
            description,
            status,
            end: end,
            start: start,
            userId: auth.user.id || "",
        });

        task.id = props.taskId;

        await taskRepository.save(task);

        router.replace("/(task)");
    };

    useEffect(() => {
        const fetchTask = async () => {
            if (!props.taskId) {
                return;
            }
            const task = await taskRepository.findById(props.taskId);
            if (task) {
                setTitle(task.title);
                setDescription(task.description || "");
                setStatus(task.status);
                setEnd(task.end);
                setStart(task.start);
            }
        };

        fetchTask();
    }, [props.taskId]);

    return (
        <View style={formStyleSheet.container}>
            <Text style={formStyleSheet.formText}>
                Please fill out the form to continue.
            </Text>

            <Card>
                <View style={formStyleSheet.formBody}>
                    <TextInput
                        placeholder="title"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    ></TextInput>

                    <TextInput
                        placeholder="description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    ></TextInput>
                    <Pressable
                        style={formStyleSheet.formButton}
                        onPress={() => {
                            onSubmit();
                        }}
                    >
                        <Text style={formStyleSheet.formButtonText}>Save</Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    );
}
