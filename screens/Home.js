import { Text, View, StyleSheet, ScrollView } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import Box from "../components/UI/Box";
import ListItem from "../components/UI/ListItem";
import ListButton from "../components/UI/ListButton";
import { useContext, useEffect, useState } from "react";
import { getAuditDirective } from "../utils/auth";
import LoadingItems from '../components/UI/LoadingItems';
import { AuthContext } from "../store/auth-context";

const instructions = [{ id: 0, title: "Talimat", status: "Sonlandırıldı" },
{ id: 1, title: "Talimat 2" },
{ id: 2, title: "Talimat 3" },
{ id: 3, title: "Talimat 4" }]


const instructions2 = [{ id: 0, title: "Talimat", status: "Sonlandırıldı" }, { id: 1, title: "Talimat 2" }, { id: 2, title: "Talimat 3" }, { id: 3, title: "Talimat 4" }]

export default function Home({ navigation }) {
    const authCtx = useContext(AuthContext);

    const [myDirectives, setMyDirectives] = useState();
    const [loading, setLoading] = useState(true);

    function onPressHandler() {
        navigation.navigate("Audit");
    }

    function handleItemPress(item, type) {
        // if (type == 1) {
        //     console.log("Talimatlarım");
        // }
        // else {
        //     console.log("Üzerimdeki Görevler");
        // }
        // console.log(id);
        navigation.navigate("InstructionDetail", { item: item, type: type })
    }

    useEffect(() => {
        //Verilen Talimatları Al

        const getDirectives = async () => {
            setLoading(true);
            const response = await getAuditDirective(authCtx.token);
            // console.log(response);
            if (response.result == 1) {
                setMyDirectives(response.list);


            }
            else {
                setMyDirectives([]);
            }

            setLoading(false);
        }

        getDirectives();


    }, [])



    // status={item.status}

    return (
        <Layout>
            <View style={[globalS.itemContainer]}>
                <Box title={"Talimatlarım"} style={globalS.mb12}>
                    <ScrollView style={globalS.scrollBox} >
                        {
                            loading ? (
                                <LoadingItems />
                            ) : myDirectives && myDirectives.length === 0 ? (<Text>Henüz talimat atamanız bulunmamaktadır.</Text>)
                                : (myDirectives.map((item, id) => {
                                    return <ListButton onPress={() => handleItemPress(item, 1)} key={item.id}>{item.title}</ListButton>;
                                })
                                )}
                    </ScrollView>
                </Box>
                {/* <Box title={"Üzerimdeki Görevler"} style={globalS.mb8}>
                    <ScrollView style={globalS.scrollBox} >
                        {instructions2.map((item, id) => {
                            return <ListButton onPress={() => handleItemPress(item.id, 2)} key={item.id} status={item.status}>{item.title}</ListButton>;
                        })}
                    </ScrollView>
                </Box> */}

                <View style={[globalS.mAuto, globalS.mt8]}>
                    <Button onPress={onPressHandler}>Denetime Geç</Button>
                </View>
            </View>
        </Layout>
    );
}
