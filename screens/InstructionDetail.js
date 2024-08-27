import { StyleSheet, Text, View } from "react-native";
import ListItem from "../components/UI/ListItem";
import Layout from "../components/Layout/Layout";
import Box from "../components/UI/Box";
import { globalS } from "../constants/styles";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import Button from "../components/UI/Button"
import Input from "../components/UI/Input"

export default function InstructionDetail({ route }) {
    const [isCheck, setIsCheck] = useState(false);
    const { item, type } = route.params;
    const root = { item, type };

    console.log(item);
    //Type 1 - Verilen Talimatlar, Type 2 - Alınan Talimatlar

    useEffect(() => {
        //API ile talimat çekme
    }, [])


    // const instruction = {
    //     id: 1,
    //     fromWho: "Ali", //Atayan
    //     toWho: "Kadir", //Kime Atandı?
    //     date: "12.05.2024", //Atandığı tarih
    //     title: "Başlık",
    //     content: "Konu İçerik Konu İçerik Konu İçerik Konu İçerik Konu İçerik",
    //     readDate: "13.05.2024",
    //     status: "Okundu",//Gönderildi, okundu, sonlandırıldı
    //     endNote: "Sonuç..",
    // }
    

    function endTask() {
        console.log("Sonlandır");
    }

    return (
        <Layout isBack={true}>
            <View style={[globalS.contentContainer]}>
                <Box title={item.title} style={globalS.mb16}>
                    {type == 1 && <ListItem title="Kime" content={item.employeeName} listContentBg />}
                    {/* {type == 2 && <ListItem title="Kimden" content={instruction.fromWho} listContentBg />} */}
                    <ListItem title="Konu" content={item.directive} column />
                    <ListItem title="Tarih" content={item.createdDate} noBorder />
                    {/* <ListItem title="Alındığı Tarih" content={instruction.readDate} /> */}
                    {/* <ListItem title="Durum" content={instruction.status} noBorder={instruction.status != "Sonlandırıldı" && true} /> */}
                    {/* {
                        instruction.status == "Sonlandırıldı" &&
                        <>
                            <ListItem title="Sonuçlanma Tarihi" content="3.07.2024" />
                            <ListItem title="Not" content={instruction.endNote} column noBorder />
                        </>
                    } */}
                </Box>
                {/* {
                   type == 2 && instruction.status != "Sonlandırıldı" &&
                    <Box>
                        <Input placeholderText={"Açıklama giriniz."} textarea={true} />
                        <Button style={[globalS.btnHalf, globalS.mt12]} onPress={endTask}>Sonlandır</Button>
                    </Box>
                } */}
            </View>

        </Layout >
    )
}

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
});