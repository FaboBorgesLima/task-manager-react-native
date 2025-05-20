import { Task } from "@faboborgeslima/task-manager-domain/dist/task";
import { Card } from "./Card";
import { Text, View } from "react-native";
export default function TaskCard(task: Task) {
    return (
        <Card>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {task.title}
                </Text>
                <Text style={{ fontSize: 16 }}>{task.description}</Text>
                <Text style={{ fontSize: 14 }}>{task.status}</Text>
            </View>
        </Card>
    );
}
