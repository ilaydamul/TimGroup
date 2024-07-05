import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Layout from '../components/Layout/Layout';
import { globalS } from '../constants/styles';
import Box from '../components/UI/Box';
import { Colors } from '../constants/colors';
import ListButton from '../components/UI/ListButton';
import { useState } from 'react';
import Button from '../components/UI/Button';
import ListItem from '../components/UI/ListItem';
import Input from '../components/UI/Input';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions, PermissionStatus } from 'expo-camera';

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
};

export default function Audit() {
    const [step, setStep] = useState(4);
    const [projects, setProjects] = useState(organizations);
    const [image, setImage] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();

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

    const handleNextStep = (item) => {
        if (step === 1) {
            setProjects(organizationProjects[item].projects);
        } else if (step === 2) {
            setProjects(projectInfo);
        }

        setStep(prevStep => prevStep + 1);
    };

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
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    let imagePreview = <Image source={require("../assets/images/noImg.png")} style={style.img} />;
    if (image) {
        imagePreview = <Image source={{ uri: image }} style={style.img} />;
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
                    </Box>
                )}
                {step === 3 && (
                    <>
                        <Box title={projects.project}>
                            <ListItem title="Müşteri" content={projects.customer} />
                            <ListItem title="Proje" content={projects.project} />
                            <ListItem title="Loc" content={projects.location} />
                            <ListItem title="Müşteri Temsilcisi" content={projects.customerRepresentative} />
                            <ListItem title="Telefon" content={projects.phone} />
                            <ListItem title="E-Posta" content={projects.email} />
                            <ListItem title="Adres" content={projects.address} noBorder contentStyle={style.mw50} />
                            <View style={[globalS.my12]}>
                                <Button onPress={handleNextStep}>Denetime Başla</Button>
                            </View>
                        </Box>
                    </>
                )}
                {step === 4 && (
                    <>
                        <Box title={"Fotoğraf Alım"}>
                            {imagePreview}
                            <Text style={style.txt}>Fotoğrafı Yorumla</Text>
                            <Input textarea />
                            <Button onPress={takePhoto} style={globalS.mt16}>Resim Çek</Button>
                        </Box>
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
});