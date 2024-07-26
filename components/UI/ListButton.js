
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';

export default function ListButton({ children, onPress, status }) {
    return (
        <Pressable style={({ pressed }) => [style.buton, pressed && style.pressed]} onPress={onPress}>
            {status == "Sonlandırıldı" && <AntDesign name="checkcircle" size={24} color="green" style={style.check} />}
            <Text style={style.btnText}>{children}</Text>
        </Pressable>
    );
};

const style = StyleSheet.create({
    check: {
        position: "absolute",
        left: -10,
        top: "60%"
    },
    buton: {
        backgroundColor: Colors.gray400,
        paddingVertical: 16,
        paddingHorizontal: 12,
        maxWidth: 250,
        margin: "auto",
        marginVertical: 8,
        width: "100%",
        borderRadius: 6,
        position: "relative"
    },
    btnText: {
        textAlign: "center",
        fontSize: 17
    },
    pressed: {
        opacity: .5
    }
});

