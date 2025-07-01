import { Card } from "@/components/Card";
import useFormStyleSheet from "@/style/getFormStyleSheet";
import { useAuthStore } from "@/store/auth.store";
import { useTaskRepository } from "@/store/repositories/task.repository";
import {
    Task,
    TaskStatus,
} from "@faboborgeslima/task-manager-domain/dist/task";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useColors } from "@/store/colors";
import { useNavigation, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Rem } from "@/constants/rem";
import { Ionicons } from "@expo/vector-icons";
import { ShowHours } from "../ShowHours";

export default function TaskForm({ taskId }: { taskId?: string }) {
    const authStore = useAuthStore();
    const taskRepository = useTaskRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);
    const formStyleSheet = useFormStyleSheet(palette);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(TaskStatus.PENDING);

    const [createdAt, setCreatedAt] = useState(new Date());
    const [updatedAt, setUpdatedAt] = useState(new Date());

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [day, setDay] = useState(new Date());

    const [wholeDay, setWholeDay] = useState(true);

    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [showDay, setShowDay] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const navigation = useNavigation();

    const onSubmit = async () => {
        const auth = authStore.auth;
        console.debug("Submitting task form", {
            taskId,
            title,
            description,
        });
        if (!auth) {
            throw new Error("User not authenticated");
        }

        let taskToSave: Task;

        end.setDate(day.getDate());
        start.setDate(day.getDate());

        end.setMonth(day.getMonth());
        start.setMonth(day.getMonth());

        end.setFullYear(day.getFullYear());
        start.setFullYear(day.getFullYear());

        try {
            taskToSave = new Task({
                id: taskId,
                title,
                description,
                status,
                start,
                end,
                createdAt,
                updatedAt,
                userId: auth.user.id as string,
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                return;
            }
            setError("Unknown error");
            return;
        }

        if (wholeDay) {
            taskToSave.setTaskToEntireDay();
        }
        try {
            await taskRepository.save(taskToSave);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                return;
            }
            setError("Unknown error");
            return;
        }

        router.replace("/(task)");
    };

    const onDelete = async () => {
        if (!taskId) {
            return;
        }

        await taskRepository.delete(taskId);

        router.replace("/(task)");
    };

    useEffect(() => {
        const fetchTask = async () => {
            if (!taskId) {
                setWholeDay(true);

                setTitle("");
                setDescription("");
                setStatus(TaskStatus.PENDING);

                setStart(new Date());
                setEnd(new Date());
                setDay(new Date());

                setCreatedAt(new Date());
                setUpdatedAt(new Date());
                return;
            }

            const taskFromRepo = await taskRepository.findById(taskId);

            if (!taskFromRepo) {
                return;
            }

            setWholeDay(taskFromRepo.isEntireDay);
            setDescription(taskFromRepo.description || "");
            setCreatedAt(taskFromRepo.createdAt);
            setUpdatedAt(taskFromRepo.updatedAt);
            setStatus(taskFromRepo.status);

            setDay(taskFromRepo.start);
            setStart(taskFromRepo.start);
            setEnd(taskFromRepo.end);
            setTitle(taskFromRepo.title);
        };

        const unsubscribe = navigation.addListener("focus", () => {
            fetchTask();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation, taskId]);

    return (
        <>
            <ScrollView
                contentContainerStyle={[formStyleSheet.container, { flex: 0 }]}
            >
                <Card>
                    <View style={formStyleSheet.formHeader}>
                        <Ionicons
                            name="sparkles"
                            size={Rem.XLARGE}
                            color={palette.secondaryContrast}
                        ></Ionicons>
                        <Text
                            style={{
                                color: palette.secondaryContrast,
                                fontSize: Rem.XLARGE,
                                textTransform: "lowercase",
                                fontWeight: "bold",
                            }}
                        >
                            {taskId ? "Edit Task" : "Create Task"}
                        </Text>
                        <Ionicons
                            name="sparkles"
                            size={Rem.XLARGE}
                            color={palette.secondaryContrast}
                        ></Ionicons>
                    </View>
                    <View style={formStyleSheet.formBody}>
                        <TextInput
                            placeholder="title"
                            value={title}
                            onChangeText={setTitle}
                            style={formStyleSheet.formInput}
                        ></TextInput>

                        <TextInput
                            placeholder="description"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            style={formStyleSheet.formInput}
                            multiline
                        ></TextInput>
                        <Pressable
                            onPress={() => {
                                setShowDay(true);
                            }}
                            style={formStyleSheet.formButton}
                        >
                            <Text style={formStyleSheet.formButtonText}>
                                {day.toLocaleDateString()}
                            </Text>
                            <Ionicons
                                name="calendar"
                                size={Rem.XLARGE}
                                color={palette.secondaryContrast}
                            ></Ionicons>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setWholeDay(!wholeDay);
                            }}
                            style={formStyleSheet.formButton}
                        >
                            <Text style={formStyleSheet.formButtonText}>
                                Whole Day
                            </Text>
                            <Ionicons
                                name={
                                    wholeDay
                                        ? "checkmark-circle"
                                        : "ellipse-outline"
                                }
                                size={Rem.XLARGE}
                                color={palette.secondaryContrast}
                            ></Ionicons>
                        </Pressable>

                        {!wholeDay ? (
                            <>
                                <ShowHours
                                    title="Start"
                                    date={start}
                                    onPress={() => setShowStart(true)}
                                ></ShowHours>

                                <ShowHours
                                    title="End"
                                    date={end}
                                    onPress={() => setShowEnd(true)}
                                ></ShowHours>
                            </>
                        ) : null}
                        <Text>{error}</Text>
                        <View style={{ flexDirection: "row", gap: Rem.MEDIUM }}>
                            {taskId ? (
                                <Pressable
                                    style={{
                                        ...formStyleSheet.formButton,
                                        width: "50%",
                                    }}
                                    onPress={onDelete}
                                >
                                    <Text style={formStyleSheet.formButtonText}>
                                        Delete
                                    </Text>
                                    <Ionicons
                                        name="trash"
                                        size={Rem.XLARGE}
                                        color={palette.secondaryContrast}
                                    ></Ionicons>
                                </Pressable>
                            ) : null}

                            <Pressable
                                style={{
                                    ...formStyleSheet.formButton,
                                    width: taskId ? "50%" : "100%",
                                }}
                                onPress={() => {
                                    onSubmit();
                                }}
                            >
                                <Text style={formStyleSheet.formButtonText}>
                                    Save
                                </Text>
                                <Ionicons
                                    name="checkmark"
                                    size={Rem.XLARGE}
                                    color={palette.secondaryContrast}
                                ></Ionicons>
                            </Pressable>
                        </View>
                    </View>
                </Card>
            </ScrollView>
            {showDay ? (
                <DateTimePicker
                    value={day}
                    onChange={(event, date) => {
                        setShowDay(false);
                        setDay(date || day);
                    }}
                    mode="date"
                ></DateTimePicker>
            ) : null}
            {showStart ? (
                <DateTimePicker
                    value={start}
                    onChange={(event, date) => {
                        setShowStart(false);
                        setStart(date || start);
                    }}
                    mode="time"
                ></DateTimePicker>
            ) : null}
            {showEnd ? (
                <DateTimePicker
                    value={end}
                    onChange={(event, date) => {
                        setEnd(date || end);
                        setShowEnd(false);
                    }}
                    mode="time"
                ></DateTimePicker>
            ) : null}
        </>
    );
}
