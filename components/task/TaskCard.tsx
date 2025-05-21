import { Task } from "@faboborgeslima/task-manager-domain/dist/task";

import { StyleSheet, Text, View } from "react-native";
import { Rem } from "@/constants/rem";
import { Typo } from "@/constants/typo";
import { PressableCard } from "../PressableCard";
import { useRouter } from "expo-router";

export default function TaskCard({ task }: { task: Task }) {
    const router = useRouter();
    const onPress = () => {
        router.push(`/(task)/${task.id}`);
    };
    return (
        <PressableCard
            onPress={onPress}
            style={{ marginBottom: Rem.LARGE, padding: Rem.LARGE }}
        >
            <View>
                <View style={styleSheet.titleContainer}>
                    <Text style={{ fontSize: Typo.MEDIUM, fontWeight: "bold" }}>
                        {task.title}
                    </Text>
                    <Text>
                        {task.isEntireDay
                            ? task.start.toLocaleDateString()
                            : task.start.toLocaleString()}
                    </Text>
                </View>
                <Text style={{ fontSize: 16 }}>{task.description}</Text>
                <Text style={{ fontSize: 14 }}>{task.status}</Text>
            </View>
        </PressableCard>
    );
}

const styleSheet = StyleSheet.create({
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
