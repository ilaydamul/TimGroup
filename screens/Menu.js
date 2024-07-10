import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native"
import Button from "../components/UI/Button";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";


export default function Menu() {
    const navigation = useNavigation();

    function pageChangeHandler(page, role) {
        navigation.navigate(page, { role: role });
    }

    return (
        <View style={[styles.container]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                <View>
                    <Button onPress={() => pageChangeHandler("Login", "true")} style={styles.btn} >Güvenlik Personelleri</Button>
                    <Button onPress={() => pageChangeHandler("Login", "false")} style={styles.btn} mt={20}>Denetmenler</Button>
                </View>
                <Image source={require("../assets/images/stars.png")} style={styles.bgStar} />
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 26,
        height: Dimensions.get('window').height,
        backgroundColor: "#1A1A1A",
    },
    bgStar: {
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        width: "100%",
        objectFit: "contain",
        opacity: 0.2
    },
    logo: {
        width: 250,
        height: 150,
        objectFit: "contain",
        marginHorizontal: "auto",
        position: "absolute",
        top: 75,
        left: "13%",
    }
});
