import { Text, View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { globalS } from "../../constants/styles";

export default function Input({ placeholderText, mb, onUpdateValue, value, isInvalid, invalidText, type, password }) {
    return (
        <View style={{ marginBottom: mb }}>
            <TextInput style={[styles.input,]} placeholder={placeholderText} onChangeText={onUpdateValue} value={value} keyboardType={type} secureTextEntry={password}  />
            {isInvalid && (<Text style={globalS.errorText}>{invalidText}</Text>)}
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: "transparent",
        borderColor: Colors.blue,
        borderWidth: 1,
        fontSize: 16
    }
})