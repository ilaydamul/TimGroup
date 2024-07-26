import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const globalS = StyleSheet.create({
    mt8: {
        marginTop: 8
    },
    mt12: {
        marginTop: 12
    },
    mt16: {
        marginTop: 16
    },
    textCenter: {
        textAlign: "center"
    },
    textStyle: {
        backgroundColor: Colors.gray400,
        paddingVertical: 12,
        paddingHorizontal: 26,
        borderRadius: 4
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
    alignStart: {
        alignItems: "flex-start",
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
    flexStart: {
        alignSelf: "flex-start"
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
    mb16: {
        marginBottom: 16
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
    },
    btnGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 16,
    },
    btnGroupRight: {
        justifyContent: "flex-end"
    },
    btnHalf: {
        minWidth: 120
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 16
    },
    leftTitle: {
        fontSize: 20,
        marginBottom: 12
    },
    scrollBox: {
        maxHeight: 250,
        overflow: "scroll"
    }

})