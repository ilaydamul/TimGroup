import { useContext, useEffect, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';
import { login } from "../utils/auth";
import LoadingOverlay from '../components/UI/LoadingOverlay';
import Toast from 'react-native-root-toast';

export default function Login({ route }) {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    const { role } = route.params;

    useEffect(() => {
        authCtx.loginControl(false, "");
    }, [])

    async function loginHandler({ username, password }) {
        setIsAuthenticating(true);

        try {
            const response = await login(username, password, role);

            if (response.data.result == 1) {
                authCtx.authenticate(response.headers['set-cookie'][0], role);
            } else {
                Toast.show('Kullanıcı adı ya da şifre yanlış..', {
                    duration: 2000,
                });
                setIsAuthenticating(false);
            }



        } catch (error) {
            console.log(error);
            if (error.includes("503")) {
                authCtx.loginControl(true, "Sunucularımız bakımda, bir süre sonra tekrar deneyin.");
            }
            else {
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