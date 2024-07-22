import { Text, View, StyleSheet, ScrollView } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import Box from "../components/UI/Box";
import ListItem from "../components/UI/ListItem";
import ListButton from "../components/UI/ListButton";

const instructions = [{ id: 0, title: "Talimat", isSuccess: true }, { id: 1, title: "Talimat 2" }, { id: 2, title: "Talimat 3" }, { id: 3, title: "Talimat 4" }]
const instructions2 = [{ id: 0, title: "Talimat", isSuccess: true }, { id: 1, title: "Talimat 2" }, { id: 2, title: "Talimat 3" }, { id: 3, title: "Talimat 4" }]

export default function Home({ navigation }) {
    function onPressHandler() {
        navigation.navigate("Audit");
    }

    function handleItemPress(id, type) {
        if (type == 1) {
            console.log("Talimatlarım");
        }
        else {
            console.log("Üzerimdeki Görevler");

        }
    }

    return (
        <Layout>
            <View style={[globalS.itemContainer]}>

                <Box title={"Talimatlarım"} style={globalS.mb12}>
                    <ScrollView style={globalS.scrollBox} >
                        {instructions.map((item, id) => {
                            return <ListButton onPress={() => handleItemPress(item.id, 1)} key={id} isSuccess={item.isSuccess}>{item.title}</ListButton>;
                        })}
                    </ScrollView>

                    {/* <ListItem title="Kime" content="Yeni Talimatınız" listContentBg />
                    <ListItem title="Konu" content="Konu İçerik" />
                    <ListItem title="Tarih" content="3.07.2024" />
                    <ListItem title="Alındığı Tarih" content="3.07.2024" />
                    <ListItem title="Durum" content="Durum İçerik" />
                    <ListItem title="Sonuçlanma Tarihi" content="3.07.2024" noBorder /> */}
                </Box>
                <Box title={"Üzerimdeki Görevler"} style={globalS.mb8}>
                    <ScrollView style={globalS.scrollBox} >
                        {instructions2.map((item, id) => {
                            return <ListButton onPress={() => handleItemPress(item.id, 2)} key={id} isSuccess={item.isSuccess}>{item.title}</ListButton>;
                        })}
                    </ScrollView>
                    {/* <ListItem title="Kime" content="Yeni Talimatınız" />
                    <ListItem title="Konu" content="Konu İçerik" />
                    <ListItem title="Tarih" content="3.07.2024" />
                    <ListItem title="Alındığı Tarih" content="3.07.2024" />
                    <ListItem title="Durum" content="Durum İçerik" />
                    <ListItem title="Sonuçlanma Tarihi" content="3.07.2024" noBorder /> */}
                </Box>

                <View style={[globalS.mAuto, globalS.mt8]}>
                    <Button onPress={onPressHandler}>Denetime Geç</Button>
                </View>
            </View>
        </Layout>
    );
}
