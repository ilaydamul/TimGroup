import { createContext, useContext, useEffect, useState } from "react";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { qrReadWrite } from "../utils/auth";
import { AuthContext } from "./auth-context";

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);
    const [netCon, setNetCon] = useState(true);
    const authCtx = useContext(AuthContext);
    const { setToastMessage } = useContext(AuthContext);

    const token = authCtx.token;


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setNetCon(state.isConnected);
        });

        return () => {
            unsubscribe();
        };

        // const subscription = Network.addNetworkStateListener((state) => {
        //     setNetCon(state.isConnected);
        // });

        // return () => {
        //     subscription && subscription.remove();
        // };
    }, []);

    const syncStoredData = async () => {
        const storedData = await AsyncStorage.getItem('data');
        if (storedData && netCon) {
            setToastMessage({ isShow: true, type: "warning", text: "Kaydedilen veri bulundu." });
            setTimeout(() => {
                setToastMessage({ isShow: false });
                qrApiRequest(storedData);
            }, 1500);
        }
    };

    const qrApiRequest = async (readData) => {
        if (readData) {
            try {
                const response = await qrReadWrite(token, readData || "");
                if (response.result == 1) {
                    setToastMessage({ isShow: true, type: "success", text: "Kod okuma başarılı!" });
                    const storedData = await AsyncStorage.getItem('data');
                    if (storedData) {
                        await AsyncStorage.removeItem('data');
                    }
                }
                else if (response.result == 2) {
                    setToastMessage({ isShow: true, type: "warning", text: "Proje alanı dışındasınız!" });
                }
                else {
                    setToastMessage({ isShow: true, type: "warning", text: "Projeye ait QR kodu okutunuz!" });
                }

            } catch (error) {
                if (error.message && error.message.includes("400")) {
                    setToastMessage({ isShow: true, type: "warning", text: "Doğru QR kodunu okutunuz!" });
                }
                else {
                    setToastMessage({ isShow: true, type: "warning", text: error });
                }
            }
        } else {
            setToastMessage({ isShow: true, type: "warning", text: "Okunan veri bulunamadı" });
        }

        setTimeout(() => {
            setToastMessage({ isShow: false });
        }, 1500);
    }


    useEffect(() => {
        if (netCon) {
            syncStoredData()
        }
    }, [netCon]);

    return (
        <DocumentContext.Provider value={{ documents, setDocuments, qrApiRequest, netCon, syncStoredData }}>
            {children}
        </DocumentContext.Provider>
    );
};
