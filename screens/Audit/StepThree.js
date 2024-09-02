import { View } from 'react-native';
import Box from '../../components/UI/Box';
import ListItem from '../../components/UI/ListItem';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import { useEffect, useState } from 'react';
import useLocationPermissionsHandler from '../../hooks/useLocationPermissions';
import LoadingItems from '../../components/UI/LoadingItems';
import Toast from 'react-native-root-toast';
import { locationCheck } from '../../utils/auth';


export default function StepThree({ project, onNext, onPrev }) {
    const [location, requestLocationPermissions] = useLocationPermissionsHandler();
    const [checkLocation, setCheckLocation] = useState(false);

    useEffect(() => {
        const locationHandler = async () => {
            const hasLocPermission = await requestLocationPermissions();


            setCheckLocation(hasLocPermission);
            console.log("Has Loc Permission:", checkLocation);


            if (!hasLocPermission) {
                return;
            }


        };

        locationHandler();
    }, [])

    async function onPressHandler() {
        //LOCATION KONTROLLERİ 
        if (checkLocation) {
            const data = {
                projectId: project.id,
                lat: location.lat,
                lng: location.lng
            }

            // DEVAM EDİLECEK!!!!!!!!!!!!!!
            console.log(data);
            
            
            try {
                const response = locationCheck(data);
                console.log(response);

            } catch (error) {
                console.log("Lokasyon Kontrol Hatası: " + error);
            }


            // onNext();
        }
        else {
            Toast.show('Konum bilgileri gerekli! ', {
                duration: 2000,
            });

        }
    }

    return (
        <Box title={project.projectName}>
            <ListItem title="Müşteri" content={project.customerName} />
            <ListItem title="Proje" content={project.projectName} />
            <ListItem title="Müşteri Temsilcisi" content={project.operationManagerName} contentStyle={{ maxWidth: 200 }} />
            <ListItem title="Telefon" content={project.customerPhone} />
            <ListItem title="E-Posta" content={project.customerEmail} contentStyle={{ maxWidth: 250 }} />
            <ListItem title="Adres" content={project.address} noBorder contentStyle={{ maxWidth: 200 }} />
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                <Button onPress={onPressHandler}>Denetime Başla</Button>
            </View>
        </Box>
    );
}
