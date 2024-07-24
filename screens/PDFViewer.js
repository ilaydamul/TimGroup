import { Text, View } from "react-native";
import Pdf from "react-native-pdf";

export default function PDFViewer({ pdf }) {
    const pdfResource = { uri: pdf, cache: true };


    return (
        <View>
            <Pdf
                trustAllCerts={false}
                source={pdfResource}
                onLoadComplete={(numberOfPages, filePath) => console.log(numberOfPages)}
            />
            
            <Text>PDF Viewer</Text>
        </View>
    )
}