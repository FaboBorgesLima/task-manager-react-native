import { useColors } from "@/store/colors";
import getFormStyleSheet from "@/style/getFormStyleSheet";
import { TextInput, View } from "react-native";

export function ValidationForm({
    validationCode,
    setValidationCode,
}: {
    validationCode: string;
    setValidationCode: (code: string) => void;
}) {
    const palette = useColors((state) => state.palette);
    const formStyleSheet = getFormStyleSheet(palette);
    return (
        <View>
            <TextInput
                placeholder="Enter validation code"
                value={validationCode}
                style={{ ...formStyleSheet.formInput, textAlign: "center" }}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={6}
                textContentType="oneTimeCode"
                onChangeText={setValidationCode}
            />
        </View>
    );
}
