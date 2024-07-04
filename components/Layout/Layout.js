import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";

export default function Layout({ children, isBack }) {

    return (
        <LinearGradient colors={["#DCDCDC", "#FFFFFF", "#DCDCDC"]} style={style.safeArea}>
            <SafeAreaView style={style.safeArea}>
                <Header isBack={isBack} />
                <ScrollView contentContainerStyle={style.scrollViewContent}>
                    {children}
                    <Image source={require("../../assets/images/stars.png")} style={style.bgStar} />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient >
    )
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,

    },
    // contentContainerStyle={style.scrollViewContent}
    scrollViewContent: {
        // flexGrow: 1,
        // height:"100%"
        minHeight: "70%",
        justifyContent: "center",
        // alignItems: "center",
        // paddingBottom: 150
    },
    banner: {
        flex: 1,
    },
    bgStar: {
        width: "100%",
        objectFit: "contain",
        position: "absolute",
        bottom: 0,
        zIndex: -1,
    }
});
