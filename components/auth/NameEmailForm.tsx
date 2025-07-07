import { useColors } from "@/store/colors";
import getFormStyleSheet from "@/style/getFormStyleSheet";
import { TextInput } from "react-native";

export const NameEmailForm = ({
    email,
    setEmail,
    name,
    setName,
}: {
    email: string;
    setEmail: (email: string) => void;
    name: string;
    setName: (name: string) => void;
}) => {
    const palette = useColors((state) => state.palette);
    const formStyleSheet = getFormStyleSheet(palette);
    return (
        <>
            <TextInput
                placeholder="name"
                autoCapitalize="none"
                onChangeText={setName}
                style={formStyleSheet.formInput}
            ></TextInput>
            <TextInput
                placeholder="email"
                inputMode="email"
                autoCapitalize="none"
                autoComplete="email"
                onChangeText={setEmail}
                style={formStyleSheet.formInput}
            ></TextInput>
        </>
    );
};
