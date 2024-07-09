import { View, Text } from "react-native"
import Layout from "../components/Layout/Layout"
import Box from "../components/UI/Box";
import Button from "../components/UI/Button";
import ListButton from "../components/UI/ListButton";
import { globalS } from "../constants/styles";
import { Colors } from "../constants/colors";


const documents = [{ id: 0, title: "Rapor Adı" }, { id: 1, title: "Rapor Adı 2" }, { id: 2, title: "Rapor Adı 3" }, { id: 3, title: "Rapor Adı 4" }, { id: 4, title: "Rapor Adı 5" },
    , { id: 5, title: "Rapor Adı 6" }, { id: 6, title: "Rapor Adı 7" }, { id: 7, title: "Rapor Adı 8" }, { id: 8, title: "Rapor Adı 9" }
];


export default Documents = () => {

    const handleNextStep = () => {

    }

    return (
        <Layout isBack={true}>
            <View style={globalS.contentContainer}>
                <Text style={globalS.title}>Özlük Evrakları</Text>
                <Box title={"Proje Seçin"}>
                    <View style={globalS.scrollBox}>
                        {documents.map((item, id) => {
                            return <ListButton onPress={() => handleNextStep(item.id)} key={id}>{item.title}</ListButton>;
                        })}
                    </View>
                </Box>
            </View>
        </Layout>
    )
}