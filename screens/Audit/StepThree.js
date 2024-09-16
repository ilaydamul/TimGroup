import { View } from 'react-native';
import Box from '../../components/UI/Box';
import ListItem from '../../components/UI/ListItem';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';
import useLocationPermissionsHandler from '../../hooks/useLocationPermissions';
import LoadingItems from '../../components/UI/LoadingItems';
import Toast from 'react-native-root-toast';
import { locationCheck } from '../../utils/auth';
import { AuthContext } from '../../store/auth-context';
import { LocationContext } from '../../store/location-context';


export default function StepThree({ project, onNext, onPrev }) {
    const [location, requestLocationPermissions] = useLocationPermissionsHandler();
    const [checkLocation, setCheckLocation] = useState(false);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const { getLocation, setGetLocation } = useContext(LocationContext);
    

    useEffect(() => {
        const locationHandler = async () => {
            const hasLocPermission = await requestLocationPermissions();

            setCheckLocation(hasLocPermission);
            // console.log("Has Loc Permission:", checkLocation);


            if (!hasLocPermission) {
                return;
            }


        };

        locationHandler();

    }, [])

    async function onPressHandler() {
        //LOCATION KONTROLLERİ 
        if (checkLocation) {
            // const loc = {
            //     lat: location.lat,
            //     lng: location.lng
            // }

            const data = {
                projectId: project.id,
                lat: location.lat,
                lng: location.lng
            }

            setGetLocation({
                lat: location.lat,
                lng: location.lng
            });

            try {
                const response = await locationCheck(token, data);
                // console.log(response);
                if (response.result == 1) {
                    onNext();
                }
                else {
                    Toast.show('Alan dışındasınız.', {
                        duration: 2000,
                    });
                }

            } catch (error) {
                Toast.show(("" + error), {
                    duration: 2000,
                });
                // console.log("Lokasyon Kontrol Hatası: " + error);
            }

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
            <ListItem title="Telefon" content={project.phoneList} />
            <ListItem title="E-Posta" content={project.emailList} contentStyle={{ maxWidth: 250 }} />
            <ListItem title="Adres" content={project.address} noBorder contentStyle={{ maxWidth: 200 }} />
            {
                checkLocation == true ?
                    <View style={globalS.btnGroup}>
                        <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                        <Button onPress={onPressHandler}>Denetime Başla</Button>
                    </View>
                    :
                    <LoadingItems />
            }

        </Box>
    );
}
