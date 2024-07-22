import React, { useState, useEffect } from "react";
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

export default function QR({ route }) {
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [status, setStatus] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(null);

  const { params } = route.params;
  // console.log(params);

  const verifyPermissions = useCameraPermissionsHandler();

  useEffect(() => {
    (async () => {
      const hasPermission = await verifyPermissions();
      console.log("Has Permission:", hasPermission);
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
    })
  }, []);

  const a = async () => {
    const storedData = await AsyncStorage.getItem("data");
    setStatus(storedData);
  }

  a();

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScanData(data);

    const networkStatus = await Network.getNetworkStateAsync();
    setIsConnected(networkStatus.isConnected);

    if (networkStatus.isConnected) {
      // İnternet bağlantısı varsa
      await AsyncStorage.setItem("data", data);
      setStatus(1);
    } else {
      // İnternet bağlantısı yoksa
      await AsyncStorage.setItem('data', data);
      setStatus(2);
    }

  };


  const openLink = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        Alert.alert("Uyarı", "Bu URL açılamıyor: " + link);
      }
    }).catch((err) => { console.error("URL açma hatası: ", err) })
  }

  return (
    <Layout isBack={true} bgDark={true} >
      <View style={[globalS.itemContainer]}>
        <View style={styles.camera2}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={styles.camera}
          />
        </View>


        {scanned && (
          <>
            <Text style={[globalS.textCenter, styles.linkText]} onPress={() => openLink(scanData)}>Bağlantıya gitmek için tıklayın{'\n'}({scanData})</Text>
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
    // borderRadius: 12,
    // overflow: "hidden",
    // margin: "auto",
    // marginBottom: 30
  },
  camera2: {
    // width: 300,
    // height: 300,
    borderRadius: 12,
    overflow: "hidden",
    margin: "auto",
    marginBottom: 30
  },
  iconText: {
    fontSize: 16
  },
  linkText: {
    marginBottom: 30
  }
});