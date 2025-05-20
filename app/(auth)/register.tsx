import { Card } from "@/components/Card";
import { getColors } from "@/constants/colors";
import formStyleSheet from "@/constants/formStyleSheet";
import { useDatasource } from "@/store/datasource.store";
import { Ionicons } from "@expo/vector-icons";
import { AuthService } from "@faboborgeslima/task-manager-domain/dist/auth";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const authService = new AuthService(
        useDatasource((get) => get.auth),
        useDatasource((get) => get.registerValidation)
    );
    const authStorage = useDatasource((get) => get.auth);

    const handleRegister = async () => {
        try {
            const user = new User({ name, email });
            // Handle registration logic here
            const registration = await authService.register(
                user,
                {
                    email,
                    password,
                },
                "mock"
            );
            router.replace("/(task)");
            authStorage.setMe(registration);
        } catch (error) {
            // Handle error here
            console.error("Registration failed:", error);
        }
    };

    return (
        <View style={formStyleSheet.container}>
            <Text style={formStyleSheet.formText}>
                Please register to your account to continue. If you already have
                an account, please login.
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
                        Register
                    </Text>
                </View>
                <View style={formStyleSheet.formBody}>
                    <TextInput
                        placeholder="name"
                        onChangeText={setName}
                    ></TextInput>
                    <TextInput
                        placeholder="email"
                        onChangeText={setEmail}
                    ></TextInput>
                    <TextInput
                        secureTextEntry
                        placeholder="password"
                        onChangeText={setPassword}
                    ></TextInput>

                    <Pressable
                        onPress={() => {
                            handleRegister();
                        }}
                        style={formStyleSheet.formButton}
                    >
                        <Text style={formStyleSheet.formButtonText}>
                            Register
                        </Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    );
}
