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
import requestLocationPermissions from "../hooks/useLocationPermissions";

export default function QR({ route }) {
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [status, setStatus] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(null);
  const [readData, setReadData] = useState(null);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // const [location, requestLocationPermissions] = requestLocationPermissions();

  const { params } = route.params;
  // console.log(params);

  // const verifyPermissions =await useCameraPermissionsHandler();
  // const verifyLocPermissions =await requestLocationPermissions();

  useEffect(() => {

    const permFunc = async () => {
      const hasPermission = useCameraPermissionsHandler;
      console.log("Has Permission:", hasPermission);


      const hasLocPermission = requestLocationPermissions();
      console.log("Has Permission:", hasLocPermission);

      if (!hasPermission) {
        return;
      }

      //Kamera izni
      // const { status2 } = await Camera.requestCameraPermissionsAsync();
      // console.log(status2);
      // setHasPermission(status2 === "granted");
      //Ağ bağlantı kontrolu

      const networkStatus = await Network.getNetworkStateAsync();
      setIsConnected(networkStatus.isConnected);

      if (networkStatus.isConnected) {
        const storedData = await AsyncStorage.getItem("data");
        if (storedData) {
          setData(storedData);
          await AsyncStorage.removeItem("data");
          setStatus(3);
        }
      }
    }

    permFunc();

  }, []);

  const a = async () => {
    const storedData = await AsyncStorage.getItem("data");
    setStatus(storedData);
  }

  a();

  const handleBarCodeScanned = async ({ type, qrCode }) => {
    setScanned(true);
    setScanData(qrCode);



    if (!location) {
      Alert.alert("Konum bilgisi alınamadı", "Konum bilgisi alınmadan QR kodu işleyemezsiniz.");
      return;
    }

    console.log(qrCode);

    setReadData({
      "code": qrCode,
      "lat": location.lat,
      "lng": location.lng,
    });

    console.log(readData);

    // API ISTEKLERI
    // const response = qrReadWrite(token, data);


    Toast.show('Kod okuma başarılı!', {
      duration: 2000,
    });

    const networkStatus = await Network.getNetworkStateAsync();
    setIsConnected(networkStatus.isConnected);

    if (networkStatus.isConnected) {
      setStatus(1);
    } else {
      setStatus(2);
    }

    await AsyncStorage.setItem("data", JSON.stringify(datas));
  };


  return (
    <Layout isBack={true} bgDark={true} >
      <View style={[globalS.itemContainer]}>
        <View style={styles.camera2}>
          {/* <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={styles.camera}
          /> */}
        </View>

        {scanned && (
          <>
            <Pressable style={globalS.textCenter} onPress={() => { setScanned(false); setScanData(null) }}>
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