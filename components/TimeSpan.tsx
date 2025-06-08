import { Rem } from "@/constants/rem";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function TimeSpan({ start, end }: { start: Date; end: Date }) {
    return (
        <View style={styleSheet.container}>
            <Ionicons name="time" size={Rem.LARGE} />
            <Text>
                {start.getHours()}:{start.getMinutes() < 10 ? "0" : ""}
                {start.getMinutes()}
            </Text>
            <Ionicons name="arrow-forward-circle" size={Rem.LARGE} />
            <Text>
                {end.getHours()}:{end.getMinutes() < 10 ? "0" : ""}
                {end.getMinutes()}
            </Text>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: Rem.MEDIUM,
        alignItems: "center",
    },
});
