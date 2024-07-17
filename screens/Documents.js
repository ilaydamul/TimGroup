import { View, Text } from "react-native"
import Layout from "../components/Layout/Layout"
import Box from "../components/UI/Box";
import Button from "../components/UI/Button";
import ListButton from "../components/UI/ListButton";
import { globalS } from "../constants/styles";
import { Colors } from "../constants/colors";
import { useState } from "react";
import Input from "../components/UI/Input";


const documents = [{ id: 0, title: "Rapor Adı" }, { id: 1, title: "Rapor Adı 2" }, { id: 2, title: "Rapor Adı 3" }, { id: 3, title: "Rapor Adı 4" }, { id: 4, title: "Rapor Adı 5" },
    , { id: 5, title: "Rapor Adı 6" }, { id: 6, title: "Rapor Adı 7" }, { id: 7, title: "Rapor Adı 8" }, { id: 8, title: "Rapor Adı 9" }
];


export default Documents = () => {
    const [step, setStep] = useState(1);

    const handleNextStep = (item) => {
        setStep(step => step + 1);
    }

    const onPressHandler = () => {

    }

    return (
        <Layout isBack={true}>
            <View style={globalS.contentContainer}>

                {step === 1 && (
                    <>
                        <Text style={globalS.title}>Özlük Evrakları</Text>
                        <Box title={"Proje Seçin"}>
                            <View style={globalS.scrollBox}>
                                {documents.map((item, id) => {
                                    return <ListButton onPress={() => handleNextStep(item.id)} key={id}>{item.title}</ListButton>;
                                })}
                            </View>
                        </Box>

                    </>
                )}

                {step === 2 && (
                    <>
                        <Box title={"Değerlendirme"}>
                            <Text style={globalS.leftTitle}>Müşteri Görüşleri</Text>
                            <Input textarea mb={12} />
                            <Text style={globalS.leftTitle}>Notlarınız</Text>
                            <Input textarea mb={12} />
                            <Text style={globalS.leftTitle}>Uyarılar</Text>
                            <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                                <Text>Görevli Personel</Text>
                                <Text style={globalS.textStyle}>Personel</Text>
                            </View>
                            <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                                <Text>İşlem</Text>
                                <Text style={globalS.textStyle}>Sözlü Uyarı</Text>
                            </View>
                            <Text style={[globalS.selectText, globalS.mb12]}>Açıklama</Text>
                            <Input textarea mb={12} />
                        </Box>
                        <View style={[globalS.mAuto, globalS.mt16]}>
                            <Button onPress={onPressHandler}>Raporu Onayla</Button>
                        </View>
                    </>
                )}
            </View>
        </Layout>
    )
}