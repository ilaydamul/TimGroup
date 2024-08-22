import { Text, View, StyleSheet, ScrollView } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import Box from "../components/UI/Box";
import ListItem from "../components/UI/ListItem";
import ListButton from "../components/UI/ListButton";
import { useContext, useEffect } from "react";
import { getAuditDirective } from "../utils/auth";
import { AuthContext } from "../store/auth-context";

const instructions = [{ id: 0, title: "Talimat", status: "Sonlandırıldı" },
{ id: 1, title: "Talimat 2" },
{ id: 2, title: "Talimat 3" },
{ id: 3, title: "Talimat 4" }]


const instructions2 = [{ id: 0, title: "Talimat", status: "Sonlandırıldı" }, { id: 1, title: "Talimat 2" }, { id: 2, title: "Talimat 3" }, { id: 3, title: "Talimat 4" }]

export default function Home({ navigation }) {
    const authCtx = useContext(AuthContext);

    function onPressHandler() {
        navigation.navigate("Audit");
    }

    function handleItemPress(id, type) {
        // if (type == 1) {
        //     console.log("Talimatlarım");
        // }
        // else {
        //     console.log("Üzerimdeki Görevler");
        // }
        // console.log(id);
        navigation.navigate("InstructionDetail", { id: id, type: type })
    }

    useEffect(() => {
        //Verilen Talimatları Al
        const getDirectives = async () => {
            const response = await getAuditDirective(authCtx.token);
            if (response.response == 1) { //Sonuç başarılıysa - Talimat yok su anda
                // console.log(response.list);
            }
            else {

            }
        }

        getDirectives();


    }, [])




    return (
        <Layout>
            <View style={[globalS.itemContainer]}>
                <Box title={"Talimatlarım"} style={globalS.mb12}>
                    <ScrollView style={globalS.scrollBox} >
                        {instructions.map((item, id) => {
                            return <ListButton onPress={() => handleItemPress(item.id, 1)} key={item.id} status={item.status}>{item.title}</ListButton>;
                        })}
                    </ScrollView>
                </Box>
                <Box title={"Üzerimdeki Görevler"} style={globalS.mb8}>
                    <ScrollView style={globalS.scrollBox} >
                        {instructions2.map((item, id) => {
                            return <ListButton onPress={() => handleItemPress(item.id, 2)} key={item.id} status={item.status}>{item.title}</ListButton>;
                        })}
                    </ScrollView>
                </Box>

                <View style={[globalS.mAuto, globalS.mt8]}>
                    <Button onPress={onPressHandler}>Denetime Geç</Button>
                </View>
            </View>
        </Layout>
    );
}
