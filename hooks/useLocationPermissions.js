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

        const location2 = await Location.getCurrentPositionAsync({});
        setLocation({
            lat: location2.coords.latitude,
            lng: location2.coords.longitude
        });

        return true;
    }

    return [location, requestLocationPermissions];
}
