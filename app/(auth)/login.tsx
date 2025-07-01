import { Card } from "@/components/Card";
import { Typo } from "@/constants/typo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import getFormStyleSheet from "@/style/getFormStyleSheet";
import { AuthService } from "@faboborgeslima/task-manager-domain/dist/auth";
import { useAuthStore } from "@/store/auth.store";
import { useColors } from "@/store/colors";
import { useAuthRepository } from "@/store/repositories/auth.repository";
import { useEmailValidation } from "@/store/register.validation";
import { useAxiosStore } from "@/store/axios.store";
import axios from "axios";
import { TaskHttpRespository } from "@/storage/http/task.http.respository";
import { UserHttpRepository } from "@/storage/http/user.http.repository";
import { AuthHttpRepository } from "@/storage/http/auth.http.respository";
import { useTaskRepository } from "@/store/repositories/task.repository";
import { useUserRepository } from "@/store/repositories/user.repository";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authRepository = useAuthRepository((state) => state.repository);
    const registerValidationService = useEmailValidation(
        (state) => state.emailValidationService
    );

    const router = useRouter();
    const authStore = useAuthStore();
    const { setAxiosInstance, axiosInstance } = useAxiosStore();
    const palette = useColors((state) => state.palette);
    const formStyleSheet = getFormStyleSheet(palette);
    const setTaskRepository = useTaskRepository((state) => state.setRepository);
    const setUserRepository = useUserRepository((state) => state.setRepository);
    const setAuthRepository = useAuthRepository((state) => state.setRepository);

    const handleLogin = async () => {
        const authService = new AuthService(
            authRepository,
            registerValidationService
        );
        try {
            const auth = await authService.login({
                email,
                password,
            });
            authStore.setAuth(auth);

            if (!(authRepository instanceof AuthHttpRepository)) {
                throw new Error(
                    "Auth repository is not an instance of AuthHttpRepository"
                );
            }

            const newInstance = axios.create({
                baseURL: axiosInstance?.getUri(),
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": "application/json",
                },
            });
            setAxiosInstance(newInstance);

            setTaskRepository(new TaskHttpRespository(newInstance));
            setUserRepository(new UserHttpRepository(newInstance));
            setAuthRepository(new AuthHttpRepository(newInstance));

            router.replace("/(task)");
        } catch (error) {
            console.error("Login failed:", error);
        }
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
                        color={palette.secondaryContrast}
                    ></Ionicons>
                    <Text
                        style={{
                            color: palette.secondaryContrast,
                            fontSize: Typo.XLARGE,
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
                        inputMode="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        style={formStyleSheet.formInput}
                    ></TextInput>
                    <TextInput
                        placeholder="password"
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        style={formStyleSheet.formInput}
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
                    color: palette.backgroundContrast,
                    fontSize: Typo.SMALL,
                }}
            >
                Don't have an account? Register here.
            </Link>
        </View>
    );
}
