import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { globalS } from "../../constants/styles";
import { Entypo } from "@expo/vector-icons";

export default function NetDot({ status }) {
    return (
        <View style={[styles.dot]}>
            <Entypo name="dot-single" size={52} color={status ? "green" : "red"} />
            <Text style={[styles.dotText]}>{status ? "Çevrimiçi" : "Çevrimdışı"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        position: "absolute",
        width: 200,
        left: 0,
        bottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    dotText: {
        marginLeft: -14
    }
})