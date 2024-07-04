
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';

export default function ListButton({ children, onPress }) {
    return (
        <Pressable style={({ pressed }) => [style.buton, pressed && style.pressed]} onPress={onPress}>
            <Text style={style.btnText}>{children}</Text>
        </Pressable>
    );
};

const style = StyleSheet.create({
    buton: {
        backgroundColor: Colors.gray400,
        paddingVertical: 16,
        paddingHorizontal: 12,
        maxWidth: 250,
        margin: "auto",
        marginVertical: 8,
        width: "100%",
        borderRadius: 6
    },
    btnText: {
        textAlign: "center",
        fontSize: 17
    },
    pressed: {
        opacity: .5
    }
});

