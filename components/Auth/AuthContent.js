import { useState } from "react";
import AuthForm from "./AuthForm";

export default function AuthContent({ onAuthenticate }) {
    function submitHandler(credentials) {
        let { username, password } = credentials;
        onAuthenticate({ username, password });
    }


    return (
        <AuthForm onSubmit={submitHandler} />
    )
}
