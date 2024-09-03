import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { WebView } from "react-native-webview";
import Button from "../components/UI/Button";
import { updateFileStatus } from "../utils/auth";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { DocumentContext } from "../store/document-context";

export default function PDFViewer({ route }) {
    const navigation = useNavigation();

    const item = route.params.item;
    const token = route.params.token;
    // const documents = route.params.documents;
    // const setDocuments = route.params.setDocuments;
    const { documents, setDocuments } = useContext(DocumentContext);


    const url = "https://timgroup.net.tr" + item.fileLink;
    const id = item.id;
    const itemStatus = item.status;

    const onPressHandler = async () => {
        const data = {
            id: id,
            status: true
        };


        try {
            const response = await updateFileStatus(token, data);

            if (response.result == 1) {
                const updatedDocuments = documents.map(doc => 
                    doc.id === id ? { ...doc, status: true } : doc
                );

                setDocuments(updatedDocuments);

                Toast.show('Evrak onaylanmıştır, 2sn içerisinde anasayfaya yönlendiriliyorsunuz. ', {
                    duration: 2000,
                });

                setTimeout(() => {
                    navigation.navigate("SecurityHome");
                }, 2000);
            }
        } catch (error) {
            console.log("Belge onay hatası: " + response);
        }

    }

    return (
        <Layout bgDark={true} isBack={true}>
            <View style={[globalS.itemContainer]}>
                <WebView style={styles.container} source={{ uri: url }} />
                {
                    !itemStatus && <Button style={globalS.mt16} onPress={onPressHandler}>Okudum, Onaylıyorum</Button>
                }
            </View>
        </Layout>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        borderRadius: 10,
        objectFit: "contain"
    },
});