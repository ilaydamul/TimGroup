import { Text, View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { globalS } from "../../constants/styles";

export default function Input({ placeholderText, mb, onUpdateValue, value, isInvalid, invalidText, type, password, textarea, label }) {
    return (
        <View style={{ marginBottom: mb }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput style={[styles.input, textarea && styles.textarea]} multiline={textarea} numberOfLines={4} placeholder={placeholderText} onChangeText={onUpdateValue} value={value} keyboardType={type} secureTextEntry={password} />
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
        borderColor: Colors.white,
        color: Colors.white,
        placeholderText: Colors.white,
        borderWidth: 1,
        fontSize: 16
    },
    textarea: {
        backgroundColor: Colors.gray400,
        borderWidth: 0,
        textAlignVertical: 'top',
        height: 100
    },
    label: {
        color: Colors.white,
        fontSize:16,
        marginBottom:14,
    }
})