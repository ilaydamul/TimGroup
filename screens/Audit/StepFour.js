import { View, Image, Text, Alert, StyleSheet } from 'react-native';
import Box from '../../components/UI/Box';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import useCameraPermissionsHandler from '../../hooks/useCameraPermissionsHandler';

export default function StepFour({ image, setImage, onNext, onPrev }) {
    const verifyPermissions = useCameraPermissionsHandler();

    const takePhoto = async () => {
        const hasPermission = await verifyPermissions();
        console.log("Has Permission:", hasPermission);
        if (!hasPermission) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    let imagePreview = <Image source={require("../../assets/images/noImg.png")} style={style.img} />;
    if (image) {
        imagePreview = <Image source={{ uri: image }} style={style.img} />;
    }

    return (
        <Box title={"Fotoğraf Alım"}>
            {imagePreview}
            <Button onPress={takePhoto} style={globalS.mt16}>Resim Çek</Button>
            <Text style={style.txt}>Fotoğrafı Yorumla</Text>
            <Input textarea />
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                <Button style={globalS.btnHalf} onPress={onNext}>Devam</Button>
            </View>
        </Box>
    );
}

const style = StyleSheet.create({
    img: {
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        borderRadius: 12,
    },
    txt: {
        textAlign: "center",
        marginVertical: 14,
        fontSize: 16,
    },
});
