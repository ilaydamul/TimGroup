import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { FontAwesome5, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import Box from "../components/UI/Box";

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


export default function Home() {
    const authCtx = useContext(AuthContext);

    function logoutHandler() {
        authCtx.logout();
    }

    return (
        <Layout>
            <View style={[globalS.itemContainer]}>

                <Box title={"Talimatlarım"} style={globalS.mb8}>
                    <View style={style.list}>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Kime</Text>
                            <Text style={[style.listContent, style.listContentBg]}>Yeni Talimatınız</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Konu</Text>
                            <Text style={style.listContent}>Konu İçerik</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Tarih</Text>
                            <Text style={style.listContent}>3.07.2024</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Alındığı Tarih</Text>
                            <Text style={style.listContent}>3.07.2024</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Durum</Text>
                            <Text style={style.listContent}>Durum İçerik</Text>
                        </View>
                        <View style={[style.listItem, style.noBorder]}>
                            <Text style={style.listTitle}>Sonuçlanma Tarihi</Text>
                            <Text style={style.listContent}>3.07.2024</Text>
                        </View>
                    </View>
                </Box>
                <Box title={"Üzerimdeki Görevler"} style={globalS.mb8}>
                    <View style={style.list}>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Kime</Text>
                            <Text style={style.listContent}>Yeni Talimatınız</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Konu</Text>
                            <Text style={style.listContent}>Konu İçerik</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Tarih</Text>
                            <Text style={style.listContent}>3.07.2024</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Alındığı Tarih</Text>
                            <Text style={style.listContent}>3.07.2024</Text>
                        </View>
                        <View style={style.listItem}>
                            <Text style={style.listTitle}>Durum</Text>
                            <Text style={style.listContent}>Durum İçerik</Text>
                        </View>
                        <View style={[style.listItem, style.noBorder]}>
                            <Text style={style.listTitle}>Sonuçlanma Tarihi</Text>
                            <Text style={style.listContent}>3.07.2024</Text>
                        </View>
                    </View>
                </Box>

                <View style={globalS.mAuto}>
                    <Button>Denetime Geç</Button>
                </View>

            </View>
        </Layout>
    );
}

const style = StyleSheet.create({
    listItem: {
        borderBottomColor: Colors.gray200,
        borderBottomWidth: 1.5,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    noBorder: {
        borderBottomWidth: 0
    },
    listTitle: {
        fontSize: 18
    },
    listContent: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    listContentBg: {
        backgroundColor: Colors.gray400,
        borderRadius: 6,
        overflow: "hidden"
    }
})