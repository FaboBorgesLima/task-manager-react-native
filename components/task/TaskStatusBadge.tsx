import { Rem } from "@/constants/rem";
import { useColors } from "@/store/colors";
import { Ionicons } from "@expo/vector-icons";
import { TaskStatus } from "@faboborgeslima/task-manager-domain/dist/task";
import { StyleSheet, Text, View } from "react-native";

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
    const palette = useColors((state) => state.palette);

    return (
        <View
            style={[
                styleSheet.container,
                {
                    backgroundColor:
                        status == TaskStatus.COMPLETED
                            ? palette.success
                            : palette.warning,
                },
            ]}
        >
            <Text
                style={[
                    styleSheet.text,
                    {
                        color:
                            status == TaskStatus.COMPLETED
                                ? palette.successContrast
                                : palette.warningContrast,
                    },
                ]}
            >
                {status}
            </Text>
            {status == TaskStatus.COMPLETED ? (
                <Ionicons
                    name="checkmark-circle"
                    size={Rem.LARGE}
                    color={palette.successContrast}
                />
            ) : (
                <Ionicons
                    name="time"
                    size={Rem.LARGE}
                    color={palette.warningContrast}
                />
            )}
        </View>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        padding: Rem.MEDIUM,
        borderRadius: Rem.LARGE,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: Rem.MEDIUM,
        transitionProperty: "background-color",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease-in-out",
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
    },
});
