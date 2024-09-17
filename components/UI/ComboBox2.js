import { Picker } from '@react-native-picker/picker'; // Make sure to install this package
import { useState } from 'react';
import { View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function ComboBox2({ data, placeholder, setValue }) {
    const [selectedValue, setSelectedValue] = useState(null);

    return (
        <View style={{ borderWidth: 1, borderColor: Colors.gray200, borderRadius: 8 }}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                    setSelectedValue(itemValue);
                    setValue(itemValue);
                }}
                style={{ height: 50, width: 150 }}
            >
                <Picker.Item label={placeholder} value={null} color="#9EA0A4" />
                {data.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
}
