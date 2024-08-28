import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export default function ComboBox({ data, placeholder, setValue }) {

    return (
        <RNPickerSelect
            onValueChange={(value) => setValue(value)}
            items={data.map(item => ({ ...item, key: item.value }))}
            placeholder={{ label: placeholder, value: null }}
            style={pickerSelectStyles}
            Icon={() => {
                return <MaterialIcons name="arrow-drop-down" size={28} color="gray" />;
            }}
        />
    )
}


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        maxWidth: 150,
        width: 150
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 0.5,
        borderColor: Colors.gray200,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        maxWidth: 150,
        width: 150
    },
});