import { Picker } from '@react-native-picker/picker'; // Make sure to install this package
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function ComboBox2({ data, placeholder, setValue }) {
    const [selectedValue, setSelectedValue] = useState(null);

    return (
        <View style={[styles.pickerContainer, { borderWidth: 1, borderColor: Colors.gray200, borderRadius: 8 }]}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                    setSelectedValue(itemValue);
                    setValue(itemValue);
                }}
                // style={{ height: 50, width: 150 }}
                style={Platform.OS === 'ios' ? styles.iosPicker : styles.androidPicker}
            // mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
            >
                <Picker.Item label={placeholder} value={null} color="#9EA0A4" />
                {data.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        // position: "absolute",
        // width: "100%",
        // zIndex: 100,
        // height: 200,
        // backgroundColor: Colors.red
        // Platformlar arası ortak stiller buraya gelebilir
    },
    iosPicker: {
        height: 50, // iOS için stiller
        width: 150
    },
    androidPicker: {
        height: 50, // Android için stiller
        width: 150,
    },
})