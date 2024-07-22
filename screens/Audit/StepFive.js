import { View, Text, StyleSheet } from 'react-native';
import Box from '../../components/UI/Box';
import Button from '../../components/UI/Button';
import ListItem from '../../components/UI/ListItem';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import { useState } from 'react';

export default function StepFive({ onNext, onPrev }) {
    const [point, setPoint] = useState(0);

    return (
        <Box title={"Değerlendirme"}>
            <ListItem title={"Güvenlik personeli nöbet kulübesi veya devriye yapması gereken alanda mı?"} isRadio />
            <ListItem title={"Güvenlik personelinin kimliği takılı mı?"} isRadio />
            <ListItem title={"Proje personel kadro sayısı tam mı?"} isRadio noBorder />
            <Text style={style.textBox}>Toplam Değerlendirme Puanı: {point}</Text>
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                <Button style={globalS.btnHalf} onPress={onNext}>Devam</Button>
            </View>
        </Box>
    );
}

const style = StyleSheet.create({
    textBox: {
        borderRadius: 6,
        backgroundColor: Colors.gray400,
        paddingVertical: 12,
        textAlign: "center",
        overflow: "hidden",
        marginTop: 12,
        fontSize: 16
    },
});
