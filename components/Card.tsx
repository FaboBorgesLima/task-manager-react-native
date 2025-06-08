import { Rem } from "@/constants/rem";
import { useColors } from "@/store/colors";
import { StyleSheet, View } from "react-native";

export function Card(props: View["props"]) {
    const palette = useColors((state) => state.palette);
    return (
        <View
            {...props}
            style={{
                ...((props.style as object) || {}),
                ...styleSheet.container,
                backgroundColor: palette.pure,
            }}
        ></View>
    );
}

export const styleSheet = StyleSheet.create({
    container: {
        display: "flex",
        boxShadow: "#000",
        elevation: Rem.MEDIUM,
        borderRadius: Rem.XLARGE,
        overflow: "hidden",
    },
});
