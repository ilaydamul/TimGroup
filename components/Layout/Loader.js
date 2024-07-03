import { Text, View } from "react-native";

export default function Loader() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Yükleniyor...</Text>
        </View>
    )
}