import { createContext, useEffect, useState } from "react";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { qrReadWrite } from "../utils/auth";

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);
    const [netCon, setNetCon] = useState(true);
    const [readData, setReadData] = useState(null);

    useEffect(() => {
        const subscription = Network.addNetworkStateListener((state) => {
            setNetCon(state.isConnected);
        });

        return () => {
            subscription && subscription.remove();
        };
    }, []);

    const syncStoredData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('data');
            const resp = qrApiRequest(storedData);
            if (resp) {
                console.log(resp);

                // await AsyncStorage.removeItem('data');
            }
        } catch (error) {
            console.error("API veya senkronizasyon hatası:", error);
        }
    };

    const qrApiRequest = async (readData) => {
        if (readData) {
            // setScanned(true);

            try {
                const response = await qrReadWrite(token, readData || "");
                return response;
                // if (response.result == 1) {
                //     setToastMessage({ isShow: true, type: "success", text: "Kod okuma başarılı!" });

                //     setTimeout(() => {
                //         setToastMessage({ isShow: false });
                //     }, 2000);

                //     const storedData = await AsyncStorage.getItem("data");

                //     if (storedData) {
                //         await AsyncStorage.removeItem("data");
                //     }

                // }
                // else if (response.result == 2) {
                //     setToastMessage({ isShow: true, type: "warning", text: "Proje alanı dışındasınız!" });

                //     setTimeout(() => {
                //         setToastMessage({ isShow: false });
                //     }, 2000);
                // }
                // else {
                //     setToastMessage({ isShow: true, type: "warning", text: "Projeye ait QR kodu okutunuz!" });

                //     setTimeout(() => {
                //         setToastMessage({ isShow: false });
                //     }, 1500);
                // }

                // setReadData(null);

            } catch (error) {
                return error;
                // if (error.message && error.message.includes("400")) {
                //     setToastMessage({ isShow: true, type: "warning", text: "Doğru QR kodunu okutunuz!" });

                //     setTimeout(() => {
                //         setToastMessage({ isShow: false });
                //     }, 1500);

                // } else if (error.message && error.message.includes("Network")) {
                //     isConnected(false);
                //     qrFunc();

                // } else {
                //     Toast.show('Hata: ' + error, {
                //         duration: 1000,
                //     });
                // }
            }


        }
    }


    useEffect(() => {
        if (netCon) {
            syncStoredData()
        }
    }, [netCon]);

    return (
        <DocumentContext.Provider value={{ documents, setDocuments, qrApiRequest, netCon }}>
            {children}
        </DocumentContext.Provider>
    );
};
