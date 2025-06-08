import { Rem } from "@/constants/rem";
import { useColors } from "@/store/colors";
import { Pressable, StyleSheet } from "react-native";
import { styleSheet } from "./Card";

export function PressableCard(props: React.ComponentProps<typeof Pressable>) {
    const palette = useColors((state) => state.palette);

    return (
        <Pressable
            {...props}
            style={{
                ...((props.style as object) || {}),
                ...styleSheet.container,
                backgroundColor: palette.pure,
            }}
        ></Pressable>
    );
}
