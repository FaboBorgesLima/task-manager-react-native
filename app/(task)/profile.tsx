import { MeRepository } from "@/storage/asyncStorage/me.respository";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Profile() {
    const meRepository = new MeRepository();
    const { auth, setAuth, clearAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        async function initMe() {
            const me = await meRepository.getMe();
            if (me) {
                console.debug(
                    "Setting authenticated user from MeRepository:",
                    me
                );
            }
        }
        initMe();
    }, []);
    async function handleLogout() {
        try {
            await meRepository.clearMe();
            setAuth(null);
            clearAuth();
            router.replace("/(auth)/login");
        } catch (error) {
            console.error("Failed to clear user data:", error);
        }
    }

    return (
        <View>
            <Pressable onPress={handleLogout}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
}
