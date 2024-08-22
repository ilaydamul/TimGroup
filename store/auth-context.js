import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    isSecurity: true,
    error: null,
    errorText: "",
    authenticate: (token, role) => { },
    logout: () => { },
    loginControl: () => { },
});

export default function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [isSecurity, setIsSecurity] = useState();
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    

    async function authenticate(token, role) {
        setAuthToken(token);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("role", role);

        if (role == "audit") {
            setIsSecurity(false);
        }
        else {
            setIsSecurity(true);
        }
    }

    async function logout() {
        setAuthToken(null);
        setIsSecurity(true);
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
    }

    function loginControl(isError, errorTxt) {
        setError(isError);
        setErrorText(errorTxt);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        isSecurity: isSecurity,
        authenticate: authenticate,
        logout: logout,
        loginControl: loginControl,
        error: error,
        errorText: errorText,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}