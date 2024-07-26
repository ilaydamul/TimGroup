import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import Box from '../../components/UI/Box';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useState } from 'react';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import ComboBox from '../../components/UI/ComboBox';
import Toast from 'react-native-root-toast';


export default function StepSix({ onSubmit }) {
    const [customerComment, setCustomerComment] = useState("");
    const [note, setNote] = useState("");
    const [warningDesc, setWarningDesc] = useState("");
    const [instructionTitle, setInstructionTitle] = useState("");
    const [instructionDesc, setInstructionDesc] = useState("");
    const [instructedStaff, setInstructedStaff] = useState('');
    const [warnedStaff, setWarnedStaff] = useState('');
    const [transitionVal, setTransitionVal] = useState('');

    const [warnings, setWarnings] = useState([]);
    const [instructions, setInstructions] = useState([]);


    function updateInputValue(inputType, enteredValue) {
        switch (inputType) {
            case "customerComment":
                setCustomerComment(enteredValue);
                break;
            case "note":
                setNote(enteredValue);
                break;
            case "warningDesc":
                setWarningDesc(enteredValue);
                break;
            case "instructionTitle":
                setInstructionTitle(enteredValue);
                break;
            case "instructionDesc":
                setInstructionDesc(enteredValue);
                break;
            default:
                break;
        }
    }

    function submitHandler() {
        onSubmit({ customerComment, note, warnings, instructions });
    }

    const personnelNames = [
        { label: 'Ahmet Yılmaz', value: 'ahmet' },
        { label: 'Ayşe Demir', value: 'ayse' },
        { label: 'Mehmet Kaya', value: 'mehmet' },
        { label: 'Fatma Çelik', value: 'fatma' },
    ];

    const transationType = [{
        label: "Sözlü Uyarı", value: "sozlu"
    }, {
        label: "Yazılı Uyarı", value: "yazili"
    }]

    function saveWarning() {
        if (!warnedStaff || !transitionVal || !warningDesc) {
            //Boş bırakılamaz uyarısı
            Toast.show('Uyarı girdilerini doldurunuz!', {
                duration: 2000,
            });
            return;
        }

        setWarnings((prevWarn) => [...prevWarn, { warnedStaff, warningDesc, transitionVal }]);
        console.log(warnings);

        //Başarılı bildirimi
        Toast.show('Uyarı başarılı bir şekilde eklendi.', {
            duration: 2000,
        });
    }

    function saveInstruction() {
        if (!instructedStaff || !instructionDesc || !instructionTitle) {
            //Boş bırakılamaz uyarısı
            Toast.show('Talimat girdilerini doldurunuz!', {
                duration: 2000,
            });
            return;
        }

        setInstructions((prevInst) => [...prevInst, { instructedStaff, instructedStaff }]);
        console.log(instructions);
        
        //Başarılı bildirimi
        Toast.show('Talimat başarılı bir şekilde eklendi.', {
            duration: 2000,
        });

    }

    return (
        <>
            <Box title={"Değerlendirme"}>
                <Text style={globalS.leftTitle}>Müşteri Görüşleri</Text>
                <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "customerComment")} />
                <Text style={globalS.leftTitle}>Notlarınız</Text>
                <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "note")} />
                <Text style={globalS.leftTitle}>Uyarılar</Text>
                <View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={style.selectText}>Görevli Personel</Text>
                        <ComboBox data={personnelNames} setValue={setWarnedStaff} placeholder={"Personel Seçin.."} />
                    </View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={globalS.selectText}>İşlem</Text>
                        <ComboBox data={transationType} setValue={setTransitionVal} placeholder={"Uyarı Seçin.."} />
                    </View>
                    <Text style={[globalS.selectText, globalS.mb12]} >Açıklama</Text>
                    <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "warningDesc")} />
                    <View style={[style.flexRight, globalS.mb12]}>
                        <Button style={style.smallBtn} onPress={saveWarning}>Ekle</Button>
                    </View>
                </View>

                <Text style={globalS.leftTitle}>Talimatlar</Text>
                <View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={style.selectText}>Görevli Personel</Text>
                        <ComboBox data={personnelNames} setValue={setInstructedStaff} placeholder={"Personel Seçin.."} />
                    </View>
                    <Text style={[globalS.selectText, globalS.mb12]}>Başlık</Text>
                    <Input mb={12} grayBg onUpdateValue={updateInputValue.bind(this, "instructionTitle")} />
                    <Text style={[globalS.selectText, globalS.mb12]}>Açıklama</Text>
                    <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "instructionDesc")} />
                    <View style={[style.flexRight, globalS.mb12]}>
                        <Button style={style.smallBtn} onPress={saveInstruction}>Talimat Ver</Button>
                    </View>
                </View>
            </Box>

            <View style={[globalS.mAuto, globalS.mt16]}>
                <Button onPress={submitHandler}>Kayıt</Button>
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

