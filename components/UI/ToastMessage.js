import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'

export default function ToastMessage({ type, text, desc }) {
    return (
        <View style={style.toastContainer} >
            <View style={[
                style.toast,
                // { backgroundColor: type === "success" ? Colors.green : type === "warning" ? Colors.orange : Colors.red }
            ]}>
                <View style={[style.iconGroup, { backgroundColor: type === "success" ? Colors.green : type === "warning" ? Colors.orange : Colors.red }]}>
                    <FontAwesome5
                        name={type === "success" ? "check-circle" : "exclamation"}
                        size={60}
                        color={Colors.white}
                        style={style.icon}
                    />
                </View>

                <View style={style.group}>
                    <Text style={style.text}>{text}</Text>
                    {desc && <Text style={style.desc}>{desc}</Text>}

                </View>
            </View>
        </ View>
    )
}

const style = StyleSheet.create({
    toast: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -150 }, { translateY: -100 }],
        width: 300,
        height: 200,
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        zIndex: 12,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        // color: Colors.white,
        marginBottom: 6,
        textAlign: "center"
    },
    desc: {
        fontSize: 16,
        fontWeight: "400",
        color: Colors.white,
        textAlign: "center"
    },
    group: {
        marginTop: 12
    },
    iconGroup: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    toastContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        // backgroundColor: Colors.red
    }
})
