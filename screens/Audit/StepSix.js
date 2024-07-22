import { View, Text, StyleSheet } from 'react-native';
import Box from '../../components/UI/Box';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef } from 'react';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';

export default function StepSix({ onSubmit }) {
    const [selectedStaff, setSelectedStaff] = useState("Seç");
    const pickerRef = useRef();


    return (
        <>
            <Box title={"Değerlendirme"}>
                <Text style={globalS.leftTitle}>Müşteri Görüşleri</Text>
                <Input textarea mb={12} />
                <Text style={globalS.leftTitle}>Notlarınız</Text>
                <Input textarea mb={12} />
                <Text style={globalS.leftTitle}>Uyarılar</Text>
                <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                    <Text style={style.selectText}>Görevli Personel</Text>
                    <Picker selectedValue={selectedStaff}
                        onValueChange={(itemValue, i) => {
                            setSelectedStaff(itemValue)
                        }}
                        ref={pickerRef}
                        style={style.picker}
                        itemStyle={style.pickerText}
                    >
                        <Picker.Item label='Seç' value="0" />
                        <Picker.Item label='Personel' value="personel" />
                        <Picker.Item label='Personel 2' value="personel2" />
                        <Picker.Item label='Personel 3' value="personel3" />
                        <Picker.Item label='Personel 4' value="personel4" />
                    </Picker>
                </View>
                <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                    <Text style={globalS.selectText}>İşlem</Text>
                    <Picker selectedValue={selectedStaff}
                        onValueChange={(itemValue, i) => {
                            setSelectedStaff(itemValue)
                        }}
                        ref={pickerRef}
                        style={style.picker}
                        itemStyle={style.pickerText}
                    >
                        <Picker.Item label='Sözlü Uyarı' value="0" />
                        <Picker.Item label='Sözlü Uyarı 2' value="personel2" />
                        <Picker.Item label='Sözlü Uyarı 3' value="personel3" />
                        <Picker.Item label='Sözlü Uyarı 4' value="personel4" />
                    </Picker>
                </View>
                <Text style={[globalS.selectText, globalS.mb12]}>Açıklama</Text>
                <Input textarea mb={12} />
                <View style={[style.flexRight, globalS.mb12]}>
                    <Button style={style.smallBtn}>Ekle</Button>
                </View>
                <Text style={globalS.leftTitle}>Talimatlar</Text>
                <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                    <Text style={style.selectText}>Görevli Personel</Text>
                    <Picker selectedValue={selectedStaff}
                        onValueChange={(itemValue, i) => {
                            setSelectedStaff(itemValue)
                        }}
                        ref={pickerRef}
                        style={style.picker}
                        itemStyle={style.pickerText}
                    >
                        <Picker.Item label='Seç' value="0" />
                        <Picker.Item label='Personel' value="personel" />
                        <Picker.Item label='Personel 2' value="personel2" />
                        <Picker.Item label='Personel 3' value="personel3" />
                        <Picker.Item label='Personel 4' value="personel4" />
                    </Picker>
                </View>
                <Text style={[globalS.selectText, globalS.mb12]}>Açıklama</Text>
                <Input textarea mb={12} />
                <View style={[style.flexRight, globalS.mb12]}>
                    <Button style={style.smallBtn}>Talimat Ver</Button>
                </View>


            </Box>
            <View style={[globalS.mAuto, globalS.mt16]}>
                <Button onPress={onSubmit}>Kayıt</Button>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    picker: {
        width: 150,
        backgroundColor: Colors.gray400,
    },
    pickerText: {

    },
    selectText: {
        fontSize: 15
    },
    flexRight: {
        alignItems: "flex-end"
    },
    smallBtn: {
        width: 130
    },
    inputBg: {
        backgroundColor: Colors.gray400,
        width: 150
    }
});
