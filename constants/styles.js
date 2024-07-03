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
    textRight: {
        textAlign: "right"
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
    banner: {
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingTop: 100
    },
    lightBanner: {
        paddingBottom: 0,
        paddingTop: 90,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    pb0: {
        paddingBottom: 0
    },
    mainTitle: {
        color: Colors.white,
        textAlign: "center",
        fontSize: 24,
        marginBottom: 24,
        fontWeight: "600"
    },
    h2: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 14
    },
    overflowHidden: {
        overflow: "hidden"
    },
    logoTitle: {
        color: Colors.white,
        fontSize: 36,
        fontWeight: "800",
        fontStyle: "italic",
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 14,
        marginVertical: 20,
        marginHorizontal: 20,
    },
    searchInputIcon: {
        position: "absolute", top: 11, left: "90%", color: "#FFF"
    },
    titleColor: {
        color: Colors.blue600
    },
    my12: {
        marginVertical: 12
    },
    eventTitle: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 4
    },
    eventTitle2: {
        fontSize: 20,
    },
    eventTeam: {
        color: Colors.blue600,
        fontWeight: "500",
        fontSize: 12
    },
    eventDate: {
        fontSize: 10
    },
    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flexWrap: "wrap"
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    contactText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'black',
    }
})