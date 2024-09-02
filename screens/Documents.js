import { View, Text, ScrollView } from "react-native"
import Layout from "../components/Layout/Layout"
import Box from "../components/UI/Box";
import ListButton from "../components/UI/ListButton";
import { globalS } from "../constants/styles";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import LoadingItems from "../components/UI/LoadingItems";


export default Documents = ({ route }) => {
    const navigation = useNavigation();
    // const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const authCtx = useContext(AuthContext);
    const { documents } = route.params || {};

    // const routeItems = route.params;

    // console.log("route.params.documents");
    // console.log(route.params);

    // useEffect(() => {


    //     // if (documents) {
    //     //     setLoading(false);
    //     //     setDocuments(routeItems.docs);
    //     //     console.log(route.params.docs);

    //     // }
    // }, []);

    useEffect(() => {
        if (documents && documents.length > 0) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [documents]);


    const handleNextStep = (selectedItem) => {
        navigation.navigate("PDFViewer", { item: selectedItem, token: authCtx.token });
    }

    return (
        <Layout isBack={true} bgDark={true}>
            <View style={globalS.contentContainer}>
                <Box title={"Özlük Evrakları"}>
                    {loading ? <LoadingItems /> : (documents.length > 0 ? <ScrollView style={globalS.scrollBox}>
                        {documents.map((item, id) => (
                            <ListButton onPress={() => handleNextStep(item)} key={id} isSuccess={item.status}>
                                {item.fileName}
                            </ListButton>
                        ))}
                    </ScrollView> :
                        <Text>Size ait özlük evrakları bulunmamaktadır.</Text>)}
                </Box>
            </View>
        </Layout>
    )
}