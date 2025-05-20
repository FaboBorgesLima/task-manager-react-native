import { AuthStorage } from "@/storage/auth.storage";
import { TaskStorage } from "@/storage/task.storage";
import { Task } from "@faboborgeslima/task-manager-domain/dist/task";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function Index() {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        const taskStorage = new TaskStorage();
        const authStorage = new AuthStorage();
        const me = authStorage.getMe();
        me.then((user) => {
            if (!user) {
                return;
            }
            taskStorage.findByUser(user.user.id || "").then((tasks) => {
                console.error("tasks", tasks);
                setTasks([...tasks]);
            });
        });
    }, []);
    return (
        <ScrollView>
            {tasks.map((task) => (
                <View key={task.id}>
                    <Text>{task.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
