import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Test() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Link href="../">Go to Next Page</Link>
            <Text>Test Component</Text>
        </View>
    );
}
