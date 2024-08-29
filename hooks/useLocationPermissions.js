import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useState } from 'react';

export default function useLocationPermissionsHandler() {
    const [location, setLocation] = useState();

    async function requestLocationPermissions() {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Yetersiz İzinler!',
                'Bu uygulamayı kullanmak için konum izinlerini vermeniz gerekiyor.'
            );
            return false;
        }

        const locationResult = await Location.getCurrentPositionAsync({});
        setLocation({
            lat: locationResult.coords.latitude.toString(),
            lng: locationResult.coords.longitude.toString(),
        });
        
        return true;
    }

    return [location, requestLocationPermissions];
}
