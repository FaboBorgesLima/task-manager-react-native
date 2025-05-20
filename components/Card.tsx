import { getColors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export function Card(props: View["props"]) {
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
const styleSheet = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: getColors().pure,
        boxShadow: "#000",
        elevation: 8,
        borderRadius: 32,
        overflow: "hidden",
    },
});
