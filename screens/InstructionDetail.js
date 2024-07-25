import { Text, View } from "react-native";
import ListItem from "../components/UI/ListItem";
import Layout from "../components/Layout/Layout";
import Box from "../components/UI/Box";
import { globalS } from "../constants/styles";

export default function InstructionDetail({ route }) {
    const { id, type } = route.params;
    const root = { id, type };
    console.log(root);
    //Type 1 - Verilen Talimatlar, Type 2 - Alınan Talimatlar



    return (
        <Layout isBack={true}>
            <View style={[globalS.contentContainer]}>
                <Box title={"Talimat"}>
                    {type == 1 && <ListItem title="Kime" content="Ali Dura" listContentBg /> }
                    

                    <ListItem title="Konu" content="Konu İçerik" />
                    <ListItem title="Tarih" content="3.07.2024" />
                    <ListItem title="Alındığı Tarih" content="3.07.2024" />
                    <ListItem title="Durum" content="Durum İçerik" />
                    <ListItem title="Sonuçlanma Tarihi" content="3.07.2024" noBorder />
                </Box>
            </View>

        </Layout >
    )
}