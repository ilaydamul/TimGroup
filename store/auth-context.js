import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    error: null,
    errorText: "",
    authenticate: (token) => { },
    logout: () => { },
    loginControl: () => { },
});

export default function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    async function authenticate(token) {
        setAuthToken(token);
        await AsyncStorage.setItem("token", token);
    }

    async function logout() {
        setAuthToken(null);
        await AsyncStorage.removeItem("token");
    }

    function loginControl(isError, errorTxt) {
        // console.log("Hata durumu: ", isError);
        // console.log("Hata mesajı: ", errorTxt);
        setError(isError);
        setErrorText(errorTxt);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
        loginControl: loginControl,
        error: error,
        errorText: errorText,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}