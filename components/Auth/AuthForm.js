import { View, Text, StyleSheet, Keyboard, Dimensions } from "react-native"
import { globalS } from "../../constants/styles";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../store/auth-context";


export default function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
    const navigation = useNavigation();
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const authCtx = useContext(AuthContext);

    const [hasError, setHasError] = useState(authCtx.error);
    const [errorText, setErrorText] = useState(authCtx.errorText);


    useEffect(() => {
        setHasError(authCtx.error);
        setErrorText(authCtx.errorText);
    }, [authCtx.error, authCtx.errorText]);

    const {
        name: nameIsInvalid,
        email: emailIsInvalid,
        // phone: phoneIsInvalid,
        password: passwordIsInvalid,
    } = credentialsInvalid;

    function updateInputValue(inputType, enteredValue) {
        switch (inputType) {
            case 'name':
                setEnteredName(enteredValue);
                break;
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'phone':
                setEnteredPhone(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        if ((!isLogin && (!enteredName || !enteredEmail || !enteredPhone || !enteredPassword)) ||
            (isLogin && (!enteredEmail || !enteredPassword))) {
            authCtx.loginControl(true, "Boş alan bırakmayın!");
            return;
        }

        authCtx.loginControl(false, "");
        Keyboard.dismiss();

        onSubmit({
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone,
            password: enteredPassword,
        });

    }

    // function goToForgetPass() {

    // }

    function redirectLink() {
        if (isLogin) {
            navigation.navigate("Register");
        }
        else {
            navigation.navigate("Login");
        }
    }

    return (
        <View style={[styles.container, styles.bgBlack]}>
            <View style={styles.formContainer}>
                <Text style={[globalS.textCenter, styles.mainTitle]}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</Text>
                <View>
                    {!isLogin && (<Input placeholderText="Ad Soyad" mb={12} onUpdateValue={updateInputValue.bind(this, "name")} value={enteredName} isInvalid={nameIsInvalid} invalidText={"Adınızı doğru giriniz."} />)}
                    <Input placeholderText="E-Mail" mb={12} onUpdateValue={updateInputValue.bind(this, "email")} value={enteredEmail} isInvalid={emailIsInvalid} invalidText={"E-mailinizi doğru formatta giriniz."} />
                    {!isLogin && (<Input placeholderText="Telefon No" mb={12} onUpdateValue={updateInputValue.bind(this, "phone")} value={enteredPhone} type={"phone-pad"} />)}
                    <Input placeholderText="Şifre" mb={12} onUpdateValue={updateInputValue.bind(this, "password")} value={enteredPassword} isInvalid={passwordIsInvalid} password invalidText={"Güçlü bir parola giriniz."} />
                    {hasError && (<Text style={{ marginBottom: 12, color: Colors.red }}>{errorText}</Text>)}
                    {/* {isLogin && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={globalS.textRight} onPress={goToForgetPass()}>Şifreni mi unuttun?</Text>
                        </View>
                    )} */}
                    <Button onPress={submitHandler}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</Button>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        height: Dimensions.get('window').height,
    },
    bgBlue: {
        backgroundColor: Colors.black
    },
    formContainer: {
        padding: 26,
        backgroundColor: Colors.white,
        borderRadius: 30
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 26
    },
});
