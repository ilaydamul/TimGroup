import { useCameraPermissions, PermissionStatus } from 'expo-camera';
import { Alert } from 'react-native';

export default function useCameraPermissionsHandler() {
    const [permission, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        if (permission.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (permission.status === PermissionStatus.DENIED) {
            // Alert.alert(
            //     "Yetersiz İzinler!",
            //     "Bu uygulamayı kullanmak için kamera izinlerini vermeniz gerekiyor."
            // );
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        return true;
    };

    return verifyPermissions;
}
