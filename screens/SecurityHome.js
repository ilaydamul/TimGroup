import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";



export default function SecurityHome() {
    const navigation = useNavigation();
    const goToLink = (link, stuff) => {
        navigation.navigate(link, (stuff && { params: stuff }));
    }

    const headerDoc = (
        <View style={[style.profileContainer]}>
            <View style={style.profile}>
                <FontAwesome6 name="user-large" size={24} color="#C62027" />
                <Text style={style.profileText}>Ad Soyad</Text>
            </View>
        </View>
    );


   


    return (
        <Layout bgDark={true} doc={headerDoc}>
            <View style={[globalS.itemContainer]}>

                <Text style={globalS.title}>Ne Yapmak İstersin?</Text>
                <View style={style.menu}>
                    <Pressable style={style.menuItem} onPress={() => goToLink("QR", "login")}>
                        <MaterialCommunityIcons name="login" size={24} color="white" />
                        <Text style={style.menuTitle}>Giriş</Text>
                    </Pressable>
                    <Pressable style={style.menuItem} onPress={() => goToLink("QR", "logout")}>
                        <MaterialCommunityIcons name="logout" size={24} color="white" />
                        <Text style={style.menuTitle}>Çıkış</Text>
                    </Pressable>
                    <Pressable style={style.menuItem} onPress={() => goToLink("QR", "patrol")}>
                        <MaterialCommunityIcons name="security" size={24} color="white" />
                        <Text style={style.menuTitle}>Devriye</Text>
                    </Pressable>
                </View>

                <Text style={globalS.title}>Evrakları İncele</Text>
                <View style={style.doc}>
                    <Image style={style.docImg} source={require("../assets/images/doc.png")} />
                    <View style={style.docContent}>
                        <Text style={style.docText}>Özlük Evrakları</Text>
                        <Button style={style.docBtn} textStyle={style.docBtnText} onPress={() => goToLink("Documents")}>İncelemeye Başla</Button>
                    </View>
                    <View style={style.warning}>
                        <Text style={style.warningTxt}>!</Text>
                    </View>
                </View>

            </View>
        </Layout>
    );
}

const style = StyleSheet.create({
    profileContainer: {
        // position: "relative",
        // top: -70
        paddingBottom: 30,
        paddingTop: 20
    },
    profile:
    {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        justifyContent: "center",
    },
    profileText: {
        fontWeight: "600",
        fontSize: 18,
        color: Colors.white

    },
    logoutText: {
        fontSize: 15,
        fontWeight: "600",
    },
    menu: {

        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 30
    },
    menuItem: {
        backgroundColor: Colors.softBlack,
        justifyContent: "center",
        alignItems: "center",
        width: 95,
        height: 90,
        borderRadius: 12
    },
    menuTitle: {
        color: Colors.white,
        marginTop: 6
    },
    doc: {
        backgroundColor: Colors.softBlack,
        flexDirection: "row",
        borderRadius: 8,
        overflow: "hidden",
        position: "relative"
    },
    docImg: {
        width: 140,
        objectFit: "cover"
    },
    docText: {
        color: Colors.white,
        fontSize: 16,
        marginBottom: 12,
    },
    docContent: {
        padding: 12,
        justifyContent: "center",
    },
    docBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16
    },
    docBtnText: {
        fontSize: 15
    },
    warning: {
        backgroundColor: Colors.white,
        width: 25,
        height: 25,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 6,
        top: 6
    },
    warningTxt: {
        fontWeight: "700"
    }
})