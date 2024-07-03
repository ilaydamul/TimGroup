import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Colors } from "../../constants/colors";
import { globalS } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import IconInput from "../UI/IconInput";
import { Feather } from "@expo/vector-icons";
import Header from "./Header";
import { useState } from "react";

export default function Layout({ children, isBack, imageBg }) {
    // const [headerBg, setHeaderBg] = useState("transparent");

    // function onScrollHeader(event) {
    //     const offsetY = event.nativeEvent.contentOffset.y;
    //     setHeaderBg(offsetY > 25 ? Colors.blue : 'transparent');
    // }

    return (
        <>

            <LinearGradient
                colors={["#DCDCDC", "#FFFFFF", "#DCDCDC"]}
                style={style.safeArea}
            >
                <SafeAreaView>
                    {/* headerBackgroundColor={headerBg} */}
                    <Header isBack={isBack} />
                    <ScrollView
                        contentContainerStyle={style.scrollViewContent}
                        // onScroll={onScrollHeader}
                        scrollEventThrottle={24}
                    >
                        {children}
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient >

        </>
    )
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingBottom: 150
    },
    container: {
        flex: 1,
    },
    // scrollViewContent: {
    //     flexGrow: 1,
    // },
    banner: {
        flex: 1,
    },
});
