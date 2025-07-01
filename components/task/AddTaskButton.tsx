import { Rem } from "@/constants/rem";
import { Typo } from "@/constants/typo";
import { useColors } from "@/store/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type AddTaskButtonProps = {
    onPress?: () => void;
};

export default function AddTaskButton({ onPress }: AddTaskButtonProps) {
    const palette = useColors((state) => state.palette);

    return (
        <Pressable
            style={[
                {
                    backgroundColor: palette.primary,
                },
                styleSheet.container,
            ]}
            onPress={onPress}
        >
            <Text style={[styleSheet.text, { color: palette.primaryContrast }]}>
                Task
            </Text>
            <Ionicons
                name="add-circle"
                size={Rem.XLARGE}
                color={palette.primaryContrast}
            />
        </Pressable>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        padding: Rem.LARGE,
        flexDirection: "row",
        gap: Rem.MEDIUM,
        justifyContent: "space-between",
        height: "auto",
    },
    text: {
        fontSize: Typo.LARGE,
        fontWeight: "bold",
    },
});
