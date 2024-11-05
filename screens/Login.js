import { useContext, useEffect, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';
import { login } from "../utils/auth";
import LoadingOverlay from '../components/UI/LoadingOverlay';
import Toast from 'react-native-root-toast';
import ToastMessage from '../components/UI/ToastMessage';

export default function Login({ route }) {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    const { role } = route.params;
    const { toastMessage, setToastMessage } = useContext(AuthContext);

    useEffect(() => {
        authCtx.loginControl(false, "");
    }, [])

    async function loginHandler({ username, password }) {
        setIsAuthenticating(true);

        try {
            const response = await login(username, password, role);

            if (response.data.result == 1) {
                await authCtx.authenticate(response.headers['set-cookie'][0].split(";")[0], role, response.data.user.name);
            } else {
                setToastMessage({ isShow: true, type: "warning", text: "Kullanıcı adı ya da şifre yanlış.." });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 1500);

                setIsAuthenticating(false);
            }

        } catch (error) {
            if (error.response && error.response.status === 503) {
                Toast.show('Sunucularımız bakımda, bir süre sonra tekrar deneyin.', {
                    duration: 2000,
                });
            } else {
                Toast.show(('Hata: ' + error), {
                    duration: 2000,
                });
            }

            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Giriş yapılıyor..." />;
    }

    return (
        <>
            <AuthContent onAuthenticate={loginHandler} />
            {
                toastMessage.isShow && <ToastMessage type={toastMessage.type} text={toastMessage.text} />
            }
        </>

    )
}
