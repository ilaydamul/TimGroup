import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Linking, Alert, Pressable } from "react-native";
import { CameraView, Camera } from "expo-camera";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import useCameraPermissionsHandler from "../hooks/useCameraPermissionsHandler";
import Toast from "react-native-root-toast";
import { qrReadWrite } from "../utils/auth";
import { AuthContext } from "../store/auth-context";
import { DocumentContext } from "../store/document-context";
import useLocationPermissionsHandler from "../hooks/useLocationPermissions";
import LoadingItems from "../components/UI/LoadingItems"
import NetDot from "../components/UI/NetDot";

export default function QR({ route }) {
  const [scanned, setScanned] = useState(false);
  // const [isConnected, setIsConnected] = useState(false);
  const [readData, setReadData] = useState(null);


  // const authCtx = useContext(AuthContext);
  const { setToastMessage } = useContext(AuthContext);
  const { qrApiRequest, netCon } = useContext(DocumentContext);
  // const token = authCtx.token;

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
      setToastMessage({ isShow: true, type: "warning", text: "Konum paylaşımını açın!" });
      setTimeout(() => {
        setToastMessage({ isShow: false });
      }, 1500);
    });

  }, []);


  useEffect(() => {
    if (readData) {
      qrFunc();
    }
  }, [readData]);


  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);

      const rr = {
        "code": data,
        "lat": location.lat,
        "lng": location.lng,
      };

      setReadData(rr);
    }
  };


  const qrFunc = async () => {
    // API ISTEKLERI
    if (netCon) {
      await qrApiRequest(readData);
      setReadData(null);
    }
    else {
      await AsyncStorage.setItem("data", JSON.stringify(readData));
      setToastMessage({ isShow: true, type: "warning", text: "Verileriniz kaydedildi! İnternete bağlanınca tekrar denenecek." });
      setTimeout(() => {
        setToastMessage({ isShow: false });
      }, 1500);

      setReadData(null);
    }
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

        {scanned && (
          <>
            <Pressable style={globalS.textCenter} onPress={refreshScan}>
              <Ionicons name="reload" size={24} color="black" style={globalS.textCenter} />
              <Text style={[globalS.textCenter, styles.iconText]}>Tekrar Dene</Text>
            </Pressable>
          </>
        )}

      </View>
      <NetDot status={netCon} />
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