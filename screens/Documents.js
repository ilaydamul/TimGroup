import { View, Text, ScrollView } from "react-native"
import Layout from "../components/Layout/Layout"
import Box from "../components/UI/Box";
import Button from "../components/UI/Button";
import ListButton from "../components/UI/ListButton";
import { globalS } from "../constants/styles";
import { Colors } from "../constants/colors";
import { useContext, useEffect, useState } from "react";
import Input from "../components/UI/Input";
import { useNavigation } from "@react-navigation/native";
import LoadingItems from "../components/UI/LoadingItems";
import { AuthContext } from "../store/auth-context";
import { getDocuments } from "../utils/auth";


const documents2 = [{ id: 0, title: "Rapor Adı", isSuccess: true }, { id: 1, title: "Rapor Adı 2" }, { id: 2, title: "Rapor Adı 3" }, { id: 3, title: "Rapor Adı 4" }, { id: 4, title: "Rapor Adı 5" },
    , { id: 5, title: "Rapor Adı 6" }, { id: 6, title: "Rapor Adı 7" }, { id: 7, title: "Rapor Adı 8" }, { id: 8, title: "Rapor Adı 9" }
];


export default Documents = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);
    const authCtx = useContext(AuthContext);



    useEffect(() => {
        //Verilen Talimatları Al
        const getDocumentItems = async () => {
            setLoading(true);

            try {
                const response = await getDocuments(authCtx.token);
                // console.log("response");
                console.log(response.list);
                if (response.result == 1) {
                    setDocuments(response.list);
                }
                setLoading(false);

            } catch (error) {
                console.log("Belgeler Çekim Hatası: " + error);
            }

            // if (response == 1) {
            //     setMyDirectives(response.list);
            // }
            // else {
            //     setMyDirectives([]);
            // }
            setLoading(false);
        }

        getDocumentItems();
    }, [])


    const handleNextStep = (item) => {
        navigation.navigate("PDFViewer", { pdf: "../../assets/pdf.pdf" });
        // setStep(step => step + 1);
    }

    const onPressHandler = () => {

    }

    return (
        <Layout isBack={true} bgDark={true}>
            <View style={globalS.contentContainer}>
                <Box title={"Özlük Evrakları"}>
                    {loading ? <LoadingItems /> : (
                        <ScrollView style={globalS.scrollBox}>
                            {/* {documents.map((item, id) => (
                                <ListButton onPress={() => handleNextStep(item.id)} key={id} isSuccess={item.isSuccess}>
                                    {item.title}
                                </ListButton>
                            ))} */}
                        </ScrollView>
                    )}
                </Box>
            </View>
        </Layout>
    )
}