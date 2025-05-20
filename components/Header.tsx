import { getColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { getTypo } from "@/constants/typo";

export default function Header(props: NativeStackHeaderProps) {
    return (
        <View style={styleSheet.container}>
            <Ionicons
                name="moon-outline"
                size={32}
                color={getColors().secondaryContrast}
            ></Ionicons>
            <Text style={styleSheet.text}>Task Manager</Text>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: getColors().secondary,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        gap: 8,
    },
    text: {
        color: getColors().secondaryContrast,
        fontSize: getTypo().title,
        textTransform: "lowercase",
        fontWeight: "bold",
    },
});
