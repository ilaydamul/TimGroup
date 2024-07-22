import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Layout({ children, isBack, bgDark, doc }) {

    return (
        <LinearGradient colors={["#DCDCDC", "#FFFFFF", "#DCDCDC"]} style={style.safeArea}>
            <SafeAreaView style={style.safeArea} >
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>


                    <Header isBack={isBack} bgDark={bgDark} doc={doc}/>
                    <ScrollView contentContainerStyle={style.scrollViewContent} nestedScrollEnabled={true}>
                        {children}
                        <Image source={require("../../assets/images/stars.png")} style={style.bgStar} />
                    </ScrollView>
                </KeyboardAwareScrollView>
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
        // height:"100%",
        minHeight: 500,
        // "70%"
        justifyContent: "center",
        paddingTop: 10,
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
