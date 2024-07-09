import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const globalS = StyleSheet.create({
    mt8: {
        marginTop: 8
    },
    mt16: {
        marginTop: 16
    },
    textCenter: {
        textAlign: "center"
    },
    mAuto: {
        marginHorizontal: "auto",
    },
    textRight: {
        textAlign: "right"
    },
    textBold: {
        fontWeight: "700"
    },
    dFlexCenterBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    link: {
        color: Colors.blue
    },
    linkText: {
        color: Colors.white,
        marginTop: 12
    },
    errorText: {
        color: Colors.red
    },
    contentContainer: {
        padding: 16
    },
    p16: {
        padding: 16
    },
    m16: {
        margin: 16
    },
    mb12: {
        marginBottom: 12
    },
    mb8: {
        marginBottom: 8
    },
    mb4: {
        marginBottom: 4
    },
    w100: {
        width: "100%"
    },
    bgLightBlue: {
        backgroundColor: Colors.blue100
    },

    pb0: {
        paddingBottom: 0
    },
    h2: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 14
    },
    overflowHidden: {
        overflow: "hidden"
    },
    itemContainer: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        // flexWrap: "wrap",
        // gap: 14,
        marginBottom: 20,
        marginHorizontal: 28,
        // height:"auto"
        // height: 3000
    },
    my12: {
        marginVertical: 12
    },
    btnGray: {
        backgroundColor: Colors.gray400
    }



})