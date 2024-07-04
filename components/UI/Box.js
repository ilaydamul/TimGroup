import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { globalS } from "../../constants/styles";

export default function Box({ children, title, style }) {
    return (
        <View style={[styles.box, style]}>
            <View style={styles.boxTitleGroup}><Text style={styles.boxTitle}>{title}</Text></View>
            <View style={styles.boxContent}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "white",
        overflow: "hidden",
        borderRadius: 12,
        width: "100%"
    },
    boxContent: {
        // paddingVertical: 4,
        paddingVertical: 16,
        paddingHorizontal: 18
    },
    boxTitleGroup: {
        backgroundColor: Colors.softBlack,
        padding: 20,
    },
    boxTitle: {
        color: "white",
        fontSize: 22,
        textAlign: "center"
    },
})