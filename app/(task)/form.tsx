import { Card } from "@/components/Card";
import formStyleSheet from "@/constants/formStyleSheet";
import { AuthStorage } from "@/storage/auth.storage";
import { useDatasource } from "@/store/datasource.store";
import {
    Task,
    TaskStatus,
} from "@faboborgeslima/task-manager-domain/dist/task";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Form() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(TaskStatus.PENDING);
    const [task, setTask] = useState<Task | null>(null);
    const router = useRouter();
    const taskStorage = useDatasource((get) => get.task);
    const [counter, setCounter] = useState(0);

    const onSubmit = async () => {
        const auth = await new AuthStorage().getMe();

        console.error("taskStorage", taskStorage);

        if (!auth) {
            throw new Error("User not authenticated");
        }

        const task = Task.make({
            title,
            description,
            status,
            end: new Date(),
            start: new Date(),
            userId: auth.user.id || "",
        });
    };
    return (
        <View style={formStyleSheet.container}>
            <Text style={formStyleSheet.formText}>
                Please fill out the form to continue.
            </Text>

            <Card>
                <View style={formStyleSheet.formBody}>
                    <Text>{counter}</Text>
                    <TextInput
                        placeholder="title"
                        onChangeText={(text) => setTitle(text)}
                    ></TextInput>
                    <TextInput
                        placeholder="description"
                        onChangeText={(text) => setDescription(text)}
                    ></TextInput>
                    <Pressable
                        style={formStyleSheet.formButton}
                        onPress={() => {
                            onSubmit();
                            setCounter(counter + 1);
                        }}
                    >
                        <Text style={formStyleSheet.formButtonText}>Save</Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    );
}
