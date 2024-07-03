import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { FontAwesome5, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";

const data = {
    title: "Ad Soyad",
    logo: "./../assets/images/caracal.png",
    aboutText: "Türkiye’nin ilk yazılım lisesi öğrencileri olarak 2023 yılında kurduğumuz Caracal Robotics, 2023-2024 Crescendo sezonunda Rookie olarak yarışacaktır. Takımımız; alanında bilgili, deneyimli mentörler ve daha önce FRC tecrübeleri bulunan üyelerimizden oluşmaktadır. Takım üyeleri olarak; öğrenmek, eğlenmek, değişmek, dönüşmek ve tüm bu süreci diğer arkadaşlarımızla da paylaşmak, STEM kültürünü yaymak için bir araya geldik.",
    team: {
        title: "Caracal Robotics",
        code: "#2345"
    },
    contactInfos: {
        email: "info@caracalrobotics.com",
        phone: "0541 566 9664",
        address: "İstanbul"
    },
};


export default function Profile() {
    const authCtx = useContext(AuthContext);

    function logoutHandler() {
        authCtx.logout();
    }

    return (
        <Layout isBack={true} title={"Profil"}>
            <View style={[globalS.itemContainer]}>

                <View style={globalS.w100}>
                    <Button onPress={logoutHandler}>Çıkış Yap</Button>
                </View>


            </View>
        </Layout>
    );
}

const style = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginRight: 16
    },
    title: {
        fontSize: 20,
        fontWeight: "700"
    },
    teamTitle: {
        color: Colors.blue600,
        marginTop: 12,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    penIcon: {
        position: "absolute",
        top: 12,
        right: 12
    },
})