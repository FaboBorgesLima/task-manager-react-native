import { Card } from "@/components/Card";
import getFormStyleSheet from "@/style/getFormStyleSheet";
import { MockEmailValidation } from "@/services/mock-register.validation";
import { useAuthRepository } from "@/store/repositories/auth.repository";
import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { AuthService } from "@faboborgeslima/task-manager-domain/dist/auth";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useColors } from "@/store/colors";
import { Typo } from "@/constants/typo";
import { useEmailValidation } from "@/store/register.validation";
import { NameEmailForm } from "@/components/auth/NameEmailForm";
import { ValidationForm } from "@/components/auth/ValidationForm";
import { Rem } from "@/constants/rem";
import { AuthHttpRepository } from "@/storage/http/auth.http.respository";
import { useAxiosStore } from "@/store/axios.store";
import axios from "axios";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [validation, setValidation] = useState("");

    const [errors, setErrors] = useState<string[]>([]);
    const setAxiosInstance = useAxiosStore((state) => state.setAxiosInstance);
    const axiosInstance = useAxiosStore((state) => state.axiosInstance);

    const [formPhase, setFormPhase] = useState<
        "email" | "validation" | "password"
    >("email");

    const router = useRouter();
    const authStore = useAuthStore();
    const authRepository = useAuthRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);
    const formStyleSheet = getFormStyleSheet(palette);
    const emailValidationService = useEmailValidation(
        (state) => state.emailValidationService
    );

    const authService = new AuthService(authRepository, emailValidationService);

    const sendValidationEmail = async () => {
        if (!email) {
            setErrors(["Email is required"]);
            return;
        }

        const result = await authService.sendValidation(email);

        if (!result) {
            setErrors(["Failed to send validation email"]);
        }

        return result;
    };

    const handleRegister = async () => {
        if (!password || !email || !name) {
            setErrors(["All fields are required"]);
            return;
        }
        if (password !== confirmPassword) {
            setErrors(["Passwords do not match"]);
            return;
        }
        if (validation.length < 6) {
            setErrors(["Validation code must be at least 6 characters"]);
            return;
        }

        try {
            const user = new User({
                email,
                name,
            });
            const auth = await authService.register(
                user,
                {
                    // workaround for email validation using credentials
                    email: validation,
                    password,
                },
                validation
            );

            authStore.setAuth(auth);
            if (authRepository instanceof AuthHttpRepository) {
                setAxiosInstance(
                    axios.create({
                        baseURL: axios.getUri(),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${auth.token}`,
                        },
                    })
                );
            }
            router.replace("/(task)");
        } catch (error) {
            if (error instanceof Error)
                setErrors([
                    error.message || "An error occurred during registration",
                ]);
        }
    };
    useEffect(() => {
        setErrors([]);
    }, [formPhase]);

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
                        color={palette.secondaryContrast}
                    ></Ionicons>
                    <Text
                        style={{
                            color: palette.secondaryContrast,
                            fontSize: 32,
                            textTransform: "lowercase",
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Text>
                </View>
                <View style={formStyleSheet.formBody}>
                    {errors.length > 0 && (
                        <View style={{ marginBottom: Rem.LARGE }}>
                            {errors.map((error, index) => (
                                <Text
                                    key={index}
                                    style={{
                                        color: "red",
                                        fontSize: Typo.SMALL,
                                    }}
                                >
                                    {error}
                                </Text>
                            ))}
                        </View>
                    )}
                    {formPhase === "email" && (
                        <>
                            <NameEmailForm
                                email={email}
                                setEmail={setEmail}
                                name={name}
                                setName={setName}
                            ></NameEmailForm>
                            <Pressable
                                onPress={async () => {
                                    const result = await sendValidationEmail();
                                    if (result) {
                                        setFormPhase("validation");
                                    } else {
                                        setErrors([
                                            "Failed to send validation email",
                                        ]);
                                    }
                                }}
                                style={formStyleSheet.formButton}
                            >
                                <Text style={formStyleSheet.formButtonText}>
                                    Send Validation Email
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setFormPhase("validation")}
                                style={{
                                    ...formStyleSheet.formButton,
                                    backgroundColor: palette.primary,
                                }}
                            >
                                <Text style={formStyleSheet.formButtonText}>
                                    Continue to Validation
                                </Text>
                            </Pressable>
                        </>
                    )}
                    {formPhase === "validation" && (
                        <>
                            <ValidationForm
                                validationCode={validation}
                                setValidationCode={setValidation}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: Rem.MEDIUM,
                                }}
                            >
                                <Pressable
                                    onPress={() => setFormPhase("email")}
                                    style={{
                                        ...formStyleSheet.formButton,
                                        width: "50%",
                                    }}
                                >
                                    <Text style={formStyleSheet.formButtonText}>
                                        Check Email
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => setFormPhase("password")}
                                    style={{
                                        ...formStyleSheet.formButton,
                                        width: "50%",
                                    }}
                                >
                                    <Text style={formStyleSheet.formButtonText}>
                                        Continue to Password
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                    {formPhase === "password" && (
                        <>
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                autoCapitalize="none"
                                style={formStyleSheet.formInput}
                            />
                            <TextInput
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                style={formStyleSheet.formInput}
                            />

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: Rem.MEDIUM,
                                }}
                            >
                                <Pressable
                                    onPress={() => setFormPhase("validation")}
                                    style={{
                                        ...formStyleSheet.formButton,
                                        width: "50%",
                                    }}
                                >
                                    <Text style={formStyleSheet.formButtonText}>
                                        Check Code
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={handleRegister}
                                    style={{
                                        ...formStyleSheet.formButton,
                                        width: "50%",
                                    }}
                                >
                                    <Text style={formStyleSheet.formButtonText}>
                                        Register
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </View>
            </Card>
            <Link
                href="/(auth)/login"
                style={{
                    textAlign: "center",
                    color: palette.backgroundContrast,
                    fontSize: Typo.SMALL,
                }}
            >
                Already have an account? Login here.
            </Link>
        </View>
    );
}
