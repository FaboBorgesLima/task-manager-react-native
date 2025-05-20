import { Card } from "@/components/Card";
import { getColors } from "@/constants/colors";
import { getTypo } from "@/constants/typo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import formStyleSheet from "@/constants/formStyleSheet";
import { AuthService } from "@faboborgeslima/task-manager-domain/dist/auth";
import { useDatasource } from "@/store/datasource.store";
import { AuthStorage } from "@/storage/auth.storage";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authService = new AuthService(
        useDatasource((get) => get.auth),
        useDatasource((get) => get.registerValidation)
    );
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const auth = await authService.login({
                email,
                password,
            });
            new AuthStorage().setMe(auth);
            router.replace("/(task)");
        } catch (error) {}
    };

    return (
        <View style={formStyleSheet.container}>
            <Text style={formStyleSheet.formText}>
                Please login to your account to continue. If you don't have an
                account, please register.
            </Text>
            <Card>
                <View style={formStyleSheet.formHeader}>
                    <Ionicons
                        name="person-outline"
                        size={32}
                        color={getColors().secondaryContrast}
                    ></Ionicons>
                    <Text
                        style={{
                            color: getColors().secondaryContrast,
                            fontSize: 32,
                            textTransform: "lowercase",
                            fontWeight: "bold",
                        }}
                    >
                        Login
                    </Text>
                </View>
                <View style={formStyleSheet.formBody}>
                    <TextInput
                        placeholder="email"
                        onChangeText={(text) => setEmail(text)}
                    ></TextInput>
                    <TextInput
                        placeholder="password"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    ></TextInput>
                    <Pressable
                        onPress={() => {
                            handleLogin();
                        }}
                        style={formStyleSheet.formButton}
                    >
                        <Text style={formStyleSheet.formButtonText}>Login</Text>
                    </Pressable>
                </View>
            </Card>
            <Link
                href="/(auth)/register"
                style={{
                    textAlign: "center",
                    color: getColors().backgroundContrast,
                    fontSize: getTypo().small,
                }}
            >
                Don't have an account? Register here.
            </Link>
        </View>
    );
}
