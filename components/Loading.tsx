import { Typo } from "@/constants/typo";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function Loading(props: View["props"]) {
    // This is a simple loading component that can be used
    // to indicate that something is loading.
    return (
        <View
            {...props}
            style={{
                ...styleSheet.container,
                ...((props.style as object) || {}),
            }}
        >
            <ActivityIndicator
                size="large"
                color="#000"
                style={styleSheet.spinner}
            />
            <Text style={styleSheet.text}>Loading...</Text>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    spinner: {
        marginRight: 10,
    },
    text: {
        fontSize: Typo.LARGE,
        color: "#000",
    },
});
