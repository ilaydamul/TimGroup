import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function IconInput({ children, placeholderText, onChangeValue, value }) {


    return (
        <View style={[{ position: "relative", width: 320, margin: "auto" }]}>
            <TextInput placeholder={placeholderText} style={style.searchInput} placeholderTextColor={Colors.white} value={value} onChangeText={onChangeValue} />
            {children}
        </View>
    )
}

const style = StyleSheet.create({
    searchInput: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: Colors.blue600,
        borderRadius: 30,
        color: Colors.white,
        paddingRight: 45,
    }
})