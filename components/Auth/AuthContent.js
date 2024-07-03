import { useState } from "react";
import AuthForm from "./AuthForm";

export default function AuthContent({ isLogin, onAuthenticate }) {
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        name: false,
        email: false,
        phone: true,
        password: false,
    })

    function submitHandler(credentials) {
        let { name, email, phone, password } = credentials;

        // const nameIsValid = name.includes("1234567890");
        const emailIsValid = email.includes("@");
        const passwordIsValid = password.length > 6;

        if ((!isLogin && (!emailIsValid || !passwordIsValid))) {
            setCredentialsInvalid({
                email: !emailIsValid,
                password: !passwordIsValid,
            });
            return;
        };


        if (isLogin) {
            onAuthenticate({ email, password });
        }
        else {
            onAuthenticate({ name, email, phone, password });
        }
    }


    return (
        <AuthForm isLogin={isLogin} onSubmit={submitHandler} credentialsInvalid={credentialsInvalid} />
    )
}
