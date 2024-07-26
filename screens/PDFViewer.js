import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import { WebView } from "react-native-webview";

export default function PDFViewer({ pdf }) {
    const pdfResource = { uri: pdf, cache: true };

    return (
        <Layout bgDark={true} isBack={true}>
            <View style={[globalS.itemContainer]}>
                <WebView style={styles.container} source={{ uri: "https://digimondi.com/" }} />
                <Text>PDF Viewer</Text>
            </View>
        </Layout>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300
    },
});