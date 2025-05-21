import { Rem } from "@/constants/rem";
import { useColors } from "@/store/colors";
import { Colors } from "@/style/getColors";
import { Pressable, StyleSheet, View } from "react-native";

export function PressableCard(props: React.ComponentProps<typeof Pressable>) {
    const palette = useColors((state) => state.palette);
    const styleSheet = getStyleSheet(palette);
    return (
        <Pressable
            {...props}
            style={{
                ...((props.style as object) || {}),
                ...styleSheet.container,
            }}
        ></Pressable>
    );
}

const getStyleSheet = (palette: Colors) =>
    StyleSheet.create({
        container: {
            display: "flex",
            backgroundColor: palette.pure,
            boxShadow: "#000",
            elevation: Rem.MEDIUM,
            borderRadius: Rem.XLARGE,
            overflow: "hidden",
        },
    });
