import { useContext, useEffect, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';
import { login } from "../utils/auth";
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function Login() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        authCtx.loginControl(false, "");
    }, [])

    async function loginHandler({ username, password }) {
        setIsAuthenticating(true);
     
        try {
            const token = await login(username, password);
            authCtx.authenticate(token);

        } catch (error) {
            console.log(error);
            if (error.includes("503")) {
                authCtx.loginControl(true, "Sunucularımız bakımda, bir süre sonra tekrar deneyin.");
            }
            else{
                authCtx.loginControl(true, "Hatalı e-mail ya da şifre!");
            }

            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Giriş yapılıyor..." />;
    }

    return (
        <AuthContent onAuthenticate={loginHandler} />
    )
}