import { Rem } from "@/constants/rem";
import { Typo } from "@/constants/typo";
import { useColors } from "@/store/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type ShowHoursProps = {
    date: Date;
    title?: string;
} & React.ComponentProps<typeof Pressable>;

export function ShowHours({ date, title, ...props }: ShowHoursProps) {
    const palette = useColors((state) => state.palette);

    return (
        <Pressable
            style={{
                ...styleSheet.container,
                backgroundColor: palette.primary,
            }}
            {...props}
        >
            <Text style={{ ...styleSheet.text, color: palette.pure }}>
                {title}
            </Text>
            <Ionicons
                name="time"
                size={Rem.XLARGE}
                color={palette.pure}
            ></Ionicons>
            <Text style={{ ...styleSheet.text, color: palette.pure }}>
                {date.getHours().toString().padStart(2, "0")}:
                {date.getMinutes().toString().padStart(2, "0")}
            </Text>
        </Pressable>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        padding: Rem.SMALL,
        borderRadius: Rem.XLARGE,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: Rem.LARGE,
    },
    text: {
        fontSize: Typo.MEDIUM,
        textAlign: "center",
    },
});
