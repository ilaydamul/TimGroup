import { Text, View, StyleSheet } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import Box from "../components/UI/Box";
import ListItem from "../components/UI/ListItem";

export default function Home({ navigation }) {
    function onPressHandler() {
        navigation.navigate("Audit");
    }

    return (
        <Layout>
            <View style={[globalS.itemContainer]}>
                <Box title={"Talimatlarım"} style={globalS.mb12}>
                    <ListItem title="Kime" content="Yeni Talimatınız" listContentBg />
                    <ListItem title="Konu" content="Konu İçerik" />
                    <ListItem title="Tarih" content="3.07.2024" />
                    <ListItem title="Alındığı Tarih" content="3.07.2024" />
                    <ListItem title="Durum" content="Durum İçerik" />
                    <ListItem title="Sonuçlanma Tarihi" content="3.07.2024" noBorder />
                </Box>
                <Box title={"Üzerimdeki Görevler"} style={globalS.mb8}>
                    <ListItem title="Kime" content="Yeni Talimatınız" />
                    <ListItem title="Konu" content="Konu İçerik" />
                    <ListItem title="Tarih" content="3.07.2024" />
                    <ListItem title="Alındığı Tarih" content="3.07.2024" />
                    <ListItem title="Durum" content="Durum İçerik" />
                    <ListItem title="Sonuçlanma Tarihi" content="3.07.2024" noBorder />
                </Box>

                <View style={[globalS.mAuto, globalS.mt8]}>
                    <Button onPress={onPressHandler}>Denetime Geç</Button>
                </View>
            </View>
        </Layout>
    );
}

const style = StyleSheet.create({

})