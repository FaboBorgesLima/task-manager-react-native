import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function User() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>User ID: {id}</Text>
        </View>
    );
}
