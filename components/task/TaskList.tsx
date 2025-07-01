import { FlatList } from "react-native";
import TaskCard from "./TaskCard";
import { Rem } from "@/constants/rem";
import { Task } from "@faboborgeslima/task-manager-domain/dist/task";
import { StyleSheet } from "react-native";
type TaskListProps = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
} & FlatList["props"];

export default function TaskList({ tasks, setTasks }: TaskListProps) {
    return (
        <FlatList
            data={tasks}
            style={styles.container}
            contentContainerStyle={{
                gap: Rem.LARGE,
                paddingVertical: Rem.LARGE,
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
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Rem.LARGE,

        height: "auto",
    },
});
