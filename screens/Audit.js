import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Layout from '../components/Layout/Layout';
import { globalS } from '../constants/styles';
import Box from '../components/UI/Box';
import { Colors } from '../constants/colors';
import ListButton from '../components/UI/ListButton';
import { useRef, useState } from 'react';
import Button from '../components/UI/Button';
import ListItem from '../components/UI/ListItem';
import Input from '../components/UI/Input';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions, PermissionStatus } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as Location from "expo-location";
import * as turf from "@turf/turf";

const organizations = [{ id: 0, title: "Güvenlik" }, { id: 1, title: "Tesis" }, { id: 2, title: "Temizlik" }];
const organizationProjects = [
    {
        title: "Güvenlik",
        projects: [{ id: 0, title: "Güvenlik Projesi" }, { id: 1, title: "Güvenlik Projesi 2" }, { id: 2, title: "Güvenlik Projesi 3" }, { id: 3, title: "Güvenlik Projesi 4" }]
    },
    {
        title: "Tesis",
        projects: [{ id: 0, title: "Tesis Projesi" }, { id: 1, title: "Tesis Projesi 2" }, { id: 2, title: "Tesis Projesi 3" }, { id: 3, title: "Tesis Projesi 4" }]
    },
    {
        title: "Temizlik",
        projects: [{ id: 0, title: "Temizlik Projesi" }, { id: 1, title: "Temizlik Projesi 2" }, { id: 2, title: "Temizlik Projesi 3" }, { id: 3, title: "Temizlik Projesi 4" }]
    }
];
const projectInfo = {
    customer: "Asist Koruma ve Güven",
    project: "Vema Tuzla",
    location: "40.8489652,293002849",
    customerRepresentative: "Görkem Okar",
    phone: "0530 178 97 17",
    email: "gorkem@17yonetim.com",
    address: "İçmeler Mah. Çağdaş Sok. 2C/1 Tuzla/İst",
    locatin: {
        lat: 1234.43,
        long: 2343.43
    }
};
const comboBox = [
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Gujrat' },
    { key: '3', value: 'Maharashtra' },
    { key: '4', value: 'Goa' },
];

export default function Audit() {
    const [step, setStep] = useState(3);
    const [projects, setProjects] = useState();
    const [image, setImage] = useState(null);
    const [selected, setSelected] = useState();
    const [location, setLocation] = useState();
    const [permission, requestPermission] = useCameraPermissions();

    // const pointCoords = [41.117478394919374, 28.99353263902384];

    const polygonCoords = [
        [
            28.99277127785544,
            41.11812142291902
        ],
        [
            28.99277127785544,
            41.116334994013926
        ],
        [
            28.994206851549308,
            41.116334994013926
        ],
        [
            28.994206851549308,
            41.11812142291902
        ],
        [
            28.99277127785544,
            41.11812142291902
        ]
    ];

    const [selectedStaff, setSelectedStaff] = useState("Seç");
    const pickerRef = useRef();

    async function verifyPermissions() {
        if (permission.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (permission.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Yetersiz İzinler!",
                "Bu uygulamayı kullanmak için kamera izinlerini vermeniz gerekiyor."
            );
            return false;
        }

        return true;
    }

    async function locationPermissions() {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                "Yetersiz İzinler!",
                "Bu uygulamayı kullanmak için konum izinlerini vermeniz gerekiyor."
            );
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const currentLat = location.coords.latitude;
        const currentLong = location.coords.longitude;

        console.log(currentLong);
        console.log(currentLat);

        const point = turf.point([currentLong, currentLat]);
        const polygon = turf.polygon([polygonCoords]);
        const isInside = turf.booleanPointInPolygon(point, polygon);
        console.log(isInside);
    }

    const handleNextStep = (item) => {
        if (step === 1) {
            setProjects(organizationProjects[item].projects);
        }

        if (step == 3) {
            locationPermissions();
            // var currentLat = location.coords.latitude;
            // var currentLong = location.coords.longitude;
            // console.log(currentLat);
            // console.log(currentLong);
        }
        else {
            setStep(prevStep => prevStep + 1);
        }


    };

    const handlePrevStep = (item) => {
        setStep(prevStep => prevStep - 1);
    }

    const takePhoto = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            // exif: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    let imagePreview = <Image source={require("../assets/images/noImg.png")} style={style.img} />;
    if (image) {
        imagePreview = <Image source={{ uri: image }} style={style.img} />;
    }

    function onPressHandler() {
    }

    return (
        <Layout isBack={true}>
            <View style={[globalS.itemContainer]}>
                {step === 1 && (
                    <Box title={"Organizasyon Türünü Seçin"}>
                        {organizations.map((item, id) => {
                            return <ListButton onPress={() => handleNextStep(item.id)} key={id}>{item.title}</ListButton>;
                        })}
                    </Box>
                )}
                {step === 2 && (
                    <Box title={"Proje Seçin"}>
                        {projects.map((item, id) => {
                            return <ListButton onPress={() => handleNextStep(item.id)} key={id}>{item.title}</ListButton>;
                        })}
                        <View style={globalS.btnGroup}>
                            <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={handlePrevStep}>Geri</Button>

                        </View>
                    </Box>
                )}
                {step === 3 && (
                    <>
                        <Box title={projectInfo.project}>
                            <ListItem title="Müşteri" content={projectInfo.customer} />
                            <ListItem title="Proje" content={projectInfo.project} />
                            <ListItem title="Loc" content={projectInfo.location} />
                            <ListItem title="Müşteri Temsilcisi" content={projectInfo.customerRepresentative} />
                            <ListItem title="Telefon" content={projectInfo.phone} />
                            <ListItem title="E-Posta" content={projectInfo.email} />
                            <ListItem title="Adres" content={projectInfo.address} noBorder contentStyle={style.mw50} />
                            {/* <View style={[globalS.my12]}>
                                
                            </View> */}

                            <View style={globalS.btnGroup}>
                                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={handlePrevStep}>Geri</Button>
                                <Button onPress={() => handleNextStep(projectInfo.location)}>Denetime Başla</Button>
                            </View>
                        </Box>
                    </>
                )}
                {step === 4 && (
                    <>
                        <Box title={"Fotoğraf Alım"}>
                            {imagePreview}
                            <Button onPress={takePhoto} style={globalS.mt16}>Resim Çek</Button>
                            <Text style={style.txt}>Fotoğrafı Yorumla</Text>
                            <Input textarea />
                            <View style={globalS.btnGroup}>
                                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={handlePrevStep}>Geri</Button>
                                <Button style={globalS.btnHalf} onPress={handleNextStep}>Devam</Button>
                            </View>
                        </Box>

                    </>
                )}
                {step === 5 && (
                    <>
                        <Box title={"Değerlendirme"}>
                            <ListItem title={"Güvenlik personeli nöbet kulübesi veya devriye yapması gereken alanda mı?"} isRadio />
                            <ListItem title={"Güvenlik personelinin kimliği takılı mı?"} isRadio />
                            <ListItem title={"Proje personel kadro sayısı tam mı?"} isRadio noBorder />
                            <Text style={style.textBox}>Toplam Değerlendirme Puanı: 40</Text>
                            <View style={globalS.btnGroup}>
                                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={handlePrevStep}>Geri</Button>
                                <Button style={globalS.btnHalf} onPress={handleNextStep}>Devam</Button>
                            </View>
                        </Box>

                    </>
                )}
                {step === 6 && (
                    <>
                        <Box title={"Değerlendirme"}>
                            <Text style={globalS.leftTitle}>Müşteri Görüşleri</Text>
                            <Input textarea mb={12} />
                            <Text style={globalS.leftTitle}>Notlarınız</Text>
                            <Input textarea mb={12} />
                            <Text style={globalS.leftTitle}>Uyarılar</Text>
                            <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                                <Text style={style.selectText}>Görevli Personel</Text>
                                <Picker selectedValue={selectedStaff}
                                    onValueChange={(itemValue, i) => {
                                        setSelectedStaff(itemValue)
                                    }}
                                    ref={pickerRef}
                                    style={style.picker}
                                    itemStyle={style.pickerText}
                                >
                                    <Picker.Item label='Seç' value="0" />
                                    <Picker.Item label='Personel' value="personel" />
                                    <Picker.Item label='Personel 2' value="personel2" />
                                    <Picker.Item label='Personel 3' value="personel3" />
                                    <Picker.Item label='Personel 4' value="personel4" />
                                </Picker>
                            </View>
                            <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                                <Text style={globalS.selectText}>İşlem</Text>
                                <Picker selectedValue={selectedStaff}
                                    onValueChange={(itemValue, i) => {
                                        setSelectedStaff(itemValue)
                                    }}
                                    ref={pickerRef}
                                    style={style.picker}
                                    itemStyle={style.pickerText}
                                >
                                    <Picker.Item label='Sözlü Uyarı' value="0" />
                                    <Picker.Item label='Sözlü Uyarı 2' value="personel2" />
                                    <Picker.Item label='Sözlü Uyarı 3' value="personel3" />
                                    <Picker.Item label='Sözlü Uyarı 4' value="personel4" />
                                </Picker>
                            </View>
                            <Text style={[globalS.selectText, globalS.mb12]}>Açıklama</Text>
                            <Input textarea mb={12} />
                            <View style={[style.flexRight, globalS.mb12]}>
                                <Button style={style.smallBtn}>Ekle</Button>
                            </View>
                            <Text style={globalS.leftTitle}>Depo Talimatları</Text>
                            <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                                <Text style={style.selectText}>Görevli Personel</Text>
                                <Picker selectedValue={selectedStaff}
                                    onValueChange={(itemValue, i) => {
                                        setSelectedStaff(itemValue)
                                    }}
                                    ref={pickerRef}
                                    style={style.picker}
                                    itemStyle={style.pickerText}
                                >
                                    <Picker.Item label='Seç' value="0" />
                                    <Picker.Item label='Personel' value="personel" />
                                    <Picker.Item label='Personel 2' value="personel2" />
                                    <Picker.Item label='Personel 3' value="personel3" />
                                    <Picker.Item label='Personel 4' value="personel4" />
                                </Picker>
                            </View>
                            <Text style={globalS.leftTitle}>Talimatlar</Text>
                            <View style={[globalS.flexStart, globalS.mb12]}>
                                <Text style={globalS.textStyle}>Talimat Ver</Text>
                            </View>
                            <Text style={globalS.leftTitle}>Müşteri Temsilcisi</Text>
                            <View style={[globalS.dFlexCenterBetween]}>
                                <Input placeholderText={"Şifre Girin"} style={style.inputBg} />
                                {/* <Text style={globalS.textStyle}>Talimat Ver</Text> */}
                                <Button style={style.smallBtn}>Doğrula</Button>
                            </View>
                        </Box>

                        <View style={[globalS.mAuto, globalS.mt16]}>
                            <Button onPress={onPressHandler}>Kayıt</Button>
                        </View>

                    </>
                )}
            </View>
        </Layout>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    mw50: {
        maxWidth: 200,
    },
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
    textBox: {
        borderRadius: 6,
        backgroundColor: Colors.gray400,
        paddingVertical: 12,
        textAlign: "center",
        overflow: "hidden",
        marginTop: 12,
        fontSize: 16
    },
    picker: {
        width: 150,
        backgroundColor: Colors.gray400,
    },
    pickerText: {

    },
    selectText: {
        fontSize: 15
    },
    flexRight: {
        alignItems: "flex-end"
    },
    smallBtn: {
        width: 120
    },

    inputBg: {
        backgroundColor: Colors.gray400,
        width: 150
    }
});
