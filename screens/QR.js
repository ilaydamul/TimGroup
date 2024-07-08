import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";
import Layout from "../components/Layout/Layout";
import { globalS } from "../constants/styles";
import Button from "../components/UI/Button";
import { Colors } from "../constants/colors";

export default function QR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Layout>
      <View style={[globalS.itemContainer]}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />

        {scanned && (
          <>
            <Text style={[globalS.linkText, { color: Colors.black }]} onPress={() => setScanned(false)}>{scanData}</Text>
            <Text style={[globalS.linkText, { color: Colors.black }]} onPress={() => setScanned(false)}>Tekrar Taramak için Tıklayın</Text>
          </>
        )}
      </View>

    </Layout>
  );

}

const styles = StyleSheet.create({
  camera: {
    width: 200,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    margin: "auto",
    marginBottom: 100
  }
});