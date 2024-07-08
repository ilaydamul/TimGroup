import { View, Text, StyleSheet, Keyboard, Dimensions, Image, ScrollView, Platform } from "react-native"
import { globalS } from "../../constants/styles";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../store/auth-context";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function AuthForm({ onSubmit }) {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();

    const [hasError, setHasError] = useState(authCtx.error);
    const [errorText, setErrorText] = useState(authCtx.errorText);

    useEffect(() => {
        setHasError(authCtx.error);
        setErrorText(authCtx.errorText);
    }, [authCtx.error, authCtx.errorText]);

    function updateInputValue(inputType, enteredValue) {
        switch (inputType) {
            case 'username':
                setEnteredUsername(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        if (!enteredUsername || !enteredPassword) {
            authCtx.loginControl(true, "Boş alan bırakmayın!");
            return;
        }

        authCtx.loginControl(false, "");
        Keyboard.dismiss();
        onSubmit({
            username: enteredUsername,
            password: enteredPassword,
        });

    }

    function goMenu() {
        navigation.navigate("Menu");
    }

    return (
        <View style={[styles.container]}>
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                    <LinearGradient colors={["#D82026", "#721011"]} style={styles.formContainer}>
                        <View>
                            <Input label="Kullanıcı Adı" mb={12} onUpdateValue={updateInputValue.bind(this, "username")} value={enteredUsername} />
                            <Input label="Şifre" mb={12} onUpdateValue={updateInputValue.bind(this, "password")} value={enteredPassword} password />
                            {hasError && (<Text style={{ marginBottom: 12, color: Colors.white }}>{errorText}</Text>)}
                            <Button onPress={submitHandler} style={styles.btn} solidBg>Giriş Yap</Button>
                            <Text style={globalS.linkText} onPress={goMenu}>Seçim ekranına geri dön</Text>
                        </View>
                    </LinearGradient>
                    <Image source={require("../../assets/images/stars.png")} style={styles.bgStar} />
                </ScrollView>
            </KeyboardAwareScrollView>
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
    bgBlue: {
        backgroundColor: Colors.black
    },
    formContainer: {
        padding: 26,
        borderRadius: 16
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 26
    },
    starContainer: {
        // height: "100%",
    },
    bgStar: {
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        width: "100%",
        objectFit: "contain",
        opacity: 0.2
    },
    btn: {
        backgroundColor: Colors.black
    },
    logo: {
        width: 250,
        height: 150,
        objectFit: "contain",
        marginHorizontal: "auto",
        position: "absolute",
        top: 75,
        left: "13%",
        // transform:"-50%"
    }
});
