import { Rem } from "@/constants/rem";
import { useColors } from "@/store/colors";
import { Colors } from "@/style/getColors";
import { StyleSheet, View } from "react-native";

export function Card(props: View["props"]) {
    const palette = useColors((state) => state.palette);
    const styleSheet = getStyleSheet(palette);
    return (
        <View
            {...props}
            style={{
                ...((props.style as object) || {}),
                ...styleSheet.container,
            }}
        ></View>
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
