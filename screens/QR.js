import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Linking, Alert, Pressable } from "react-native";
import { CameraView, Camera } from "expo-camera";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import Button from "../components/UI/Button";
import { Colors } from "../constants/colors";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import useCameraPermissionsHandler from "../hooks/useCameraPermissionsHandler";
// import { location, requestLocationPermissions } from "../hooks/useLocationPermissions";
import Toast from "react-native-root-toast";
import { qrReadWrite } from "../utils/auth";
import { AuthContext } from "../store/auth-context";
import useLocationPermissionsHandler from "../hooks/useLocationPermissions";
import LoadingItems from "../components/UI/LoadingItems"
import ToastMessage from "../components/UI/ToastMessage";


export default function QR({ route }) {
  const [scanned, setScanned] = useState(false);
  const [status, setStatus] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [data2, setData2] = useState(null);
  const [readData, setReadData] = useState(null);
  const [showToast, setShowToast] = useState();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const { params } = route.params;

  const [location, requestLocationPermissions] = useLocationPermissionsHandler();
  const verifyPermissions = useCameraPermissionsHandler();

  const [checkLocation, setCheckLocation] = useState(false);

  useEffect(() => {

    const permFunc = async () => {
      const hasPermission = await verifyPermissions();
      const hasLocPermission = await requestLocationPermissions();
      if (!hasPermission || !hasLocPermission) {
        return;
      }

      setCheckLocation(true);
    }

    permFunc().catch((error) => {
      console.error("Permission Error:", error);
    });



    const checkNetwork = async () => {
      const networkStatus = await Network.getNetworkStateAsync();
      setIsConnected(networkStatus.isConnected);

      // const storedData = await AsyncStorage.getItem("data");
      // if (storedData && networkStatus.isConnected) {
      //   setReadData(storedData);
      //   qrApiRequest(true);
      // }
    }

    checkNetwork();

  }, []);


  useEffect(() => {
    const checkData = async () => {
      // const networkStatus = await Network.getNetworkStateAsync();
      // setIsConnected(networkStatus.isConnected);

      const storedData = await AsyncStorage.getItem("data");
      if (storedData && networkStatus.isConnected) {
        setReadData(storedData);
        qrApiRequest(true);
      }
    };

    checkData();
  }, [isConnected]);

  useEffect(() => {
    if (readData) {
      qrFunc();
    }
  }, [readData]);


  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned) {
      // setScanned(true);

      const rr = {
        "code": data,
        "lat": location.lat,
        "lng": location.lng,
      };

      setReadData(rr);

      // qrFunc();
    }
  };



  const qrFunc = async () => {
    // API ISTEKLERI
    if (isConnected) {
      qrApiRequest();
    }
    else {
      await AsyncStorage.setItem("data", JSON.stringify(readData));

      setShowToast({ type: "warning", text: "Verileriniz kaydedildi, bağlandıktan sonra işlenecektir." });

      setTimeout(() => {
        setShowToast();
      }, 1000);
      // setStatus(2);
    }


  }

  const qrApiRequest = async (isReconnect) => {
    try {
      const response = await qrReadWrite(token, readData);

      if (response.result == 1) {
        if (isReconnect) {
          setShowToast({ type: "success", text: "Kaydedilen qr kod verisi eklendi!" });
          await AsyncStorage.removeItem("data");
        }
        else {
          setShowToast({ type: "success", text: "Kod okuma başarılı!" });
        }

        setTimeout(() => {
          setShowToast();
        }, 1000);

      }
    } catch (error) {
      console.log(error);
      Toast.show('Hata: ' + error, {
        duration: 1000,
      });
    }

    setScanned(true);
  }



  const refreshScan = () => {
    setScanned(false);
  }

  return (
    <Layout isBack={true} bgDark={true} >
      <View style={[globalS.itemContainer]}>
        <View style={styles.camera2}>
          {
            checkLocation ?
              <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr", "pdf417"],
                }}
                style={styles.camera}
              />
              :
              <LoadingItems />
          }

        </View>
        {
          showToast && <ToastMessage type={showToast.type} text={showToast.text} />
        }

        {scanned && (
          <>
            <Pressable style={globalS.textCenter} onPress={refreshScan}>
              <Ionicons name="reload" size={24} color="black" style={globalS.textCenter} />
              <Text style={[globalS.textCenter, styles.iconText]}>Tekrar Dene</Text>
            </Pressable>
          </>
        )}

      </View>
    </Layout>
  );

}

const styles = StyleSheet.create({
  camera: {
    width: 300,
    height: 300,
  },
  camera2: {
    borderRadius: 12,
    overflow: "hidden",
    margin: "auto",
    marginBottom: 30
  },
  iconText: {
    fontSize: 16
  }
});