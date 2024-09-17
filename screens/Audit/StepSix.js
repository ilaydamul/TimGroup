import { View, Text, StyleSheet, Alert } from 'react-native';
import Box from '../../components/UI/Box';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useContext, useEffect, useState } from 'react';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import ComboBox from '../../components/UI/ComboBox';
import Toast from 'react-native-root-toast';
import { AuthContext } from '../../store/auth-context';
import { addAudit, addAuditWarningOrDirective, getPersonelList } from '../../utils/auth';
import { LocationContext } from '../../store/location-context';
import LoadingItems from '../../components/UI/LoadingItems';

const transationType = [{ label: "Sözlü Uyarı", value: "Sözlü Uyarı" }, { label: "Yazılı Uyarı", value: "Yazılı Uyarı" }];

export default function StepSix({ infos }) {
    const authCtx = useContext(AuthContext);
    const { getLocation } = useContext(LocationContext);
    const token = authCtx.token;

    const [personels, setPersonels] = useState([]);
    // const [location, requestLocationPermissions] = useLocationPermissionsHandler();
    // console.log(getLocation);

    const [customerComment, setCustomerComment] = useState("");
    const [note, setNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [warningDesc, setWarningDesc] = useState("");
    const [directiveTitle, setDirectiveTitle] = useState("");
    const [directiveDesc, setDirectiveDesc] = useState("");
    const [directivedStaff, setDirectivedStaff] = useState('');
    const [warnedStaff, setWarnedStaff] = useState('');
    const [transitionVal, setTransitionVal] = useState('');

    const [checkStatus, setCheckStatus] = useState(0);

    const projectId = infos.find(info => info.step === 2)?.item.id;
    const projectPhotoInfos = infos.find(info => info.step === 4)?.item;
    const projectAnswerList = infos.find(info => info.step === 5)?.item;

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
            case "directiveTitle":
                setDirectiveTitle(enteredValue);
                break;
            case "directiveDesc":
                setDirectiveDesc(enteredValue);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const personelList = async () => {
            const personel = await getPersonelList(token);
            if (personel.result == 1) {
                const personelNamesAndIds = personel.list.map((person) => ({
                    value: person.id,
                    label: person.name,
                }));
                setPersonels(personelNamesAndIds);
            }
        }
        personelList();
    }, [])

    async function saveWarning() {
        setCheckStatus(0);
        if (!warnedStaff || !transitionVal || !warningDesc) {
            Toast.show('Uyarı girdilerini doldurunuz!', {
                duration: 2000,
            });
            return;
        }

        const data = {
            employeeId: warnedStaff,
            projectId: projectId,
            comment: warningDesc,
            status: transitionVal,
        }
        setIsLoading(true);
        try {
            const addAuditWarning2 = await addAuditWarningOrDirective(token, data, "Warn");
            setCheckStatus(addAuditWarning2.result);
            // console.log(addAuditWarning2);
            // console.log(checkStatus);


        } catch (error) {
            console.log(error);
            return;
        }

        if (checkStatus == 1) {
            Toast.show('Uyarı başarılı bir şekilde eklendi.', {
                duration: 2000,
            });
        } else {
            Toast.show('Uyarı eklerken bir sorun oluştu.', {
                duration: 2000,
            });
        }


        setIsLoading(false);
    }

    async function saveDirective() {
        setCheckStatus(0);
        if (!directivedStaff || !directiveDesc || !directiveTitle) {
            Toast.show('Talimat girdilerini doldurunuz!', {
                duration: 2000,
            });
            return;
        }

        const data = {
            employeeId: directivedStaff,
            projectId: projectId,
            title: directiveTitle,
            directive: directiveDesc,
        }
        setIsLoading(true);
        try {
            const addAuditDirective2 = await addAuditWarningOrDirective(token, data, "Directive");
            setCheckStatus(addAuditDirective2.result);
        } catch (error) {
            console.log(error);
            return;
        }

        if (checkStatus === 1) {
            //Başarılı bildirimi
            Toast.show('Talimat başarılı bir şekilde eklendi.', {
                duration: 2000,
            });
        } else {
            Toast.show('Talimat eklerken bir sorun oluştu.', {
                duration: 2000,
            });
        }


        setIsLoading(false);
    }


    async function submitHandler() {
        const data = {
            projectId: projectId,
            customerComment: customerComment,
            note: note,
            picture: projectPhotoInfos.currentImage,
            pictureComment: projectPhotoInfos.comment,
            auditAnswerList: projectAnswerList,
            lat: getLocation.lat,
            lng: getLocation.lng
        };
        setIsLoading(true);
        try {
            const response = await addAudit(token, data);
            // console.log(response);

            if (response.result == 1) {
                Toast.show('Denetim kaydı başarıyla eklendi.', { duration: 2000, });
            }
            else if (response.result == 2) {
                Toast.show('Alan dışındasınız. Lütfen proje alanına giriniz.', { duration: 2000, });
            }

            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <>
            <Box title={"Değerlendirme"}>
                <Text style={globalS.leftTitle}>Müşteri Görüşleri</Text>
                <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "customerComment")} />
                <Text style={globalS.leftTitle}>Notlarınız</Text>
                <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "note")} />
                <View style={[style.flexRight, globalS.mb12]}>
                    <Button style={style.smallBtn} onPress={submitHandler}>Kaydet</Button>
                </View>
                <Text style={globalS.leftTitle}>Uyarılar</Text>
                <View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={style.selectText}>Görevli Personel</Text>
                        {/* {personels && <ComboBox data={personels} setValue={setWarnedStaff} placeholder={"Personel Seçin.."} />} */}

                    </View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={globalS.selectText}>İşlem</Text>
                        <ComboBox data={transationType} setValue={setTransitionVal} placeholder={"Uyarı Seçin.."} />
                    </View>
                    <Text style={[globalS.selectText, globalS.mb12]} >Açıklama</Text>
                    <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "warningDesc")} />
                    <View style={[style.flexRight, globalS.mb12]}>
                        <Button style={style.smallBtn} onPress={async () => await saveWarning()}>Ekle</Button>
                    </View>
                </View>

                <Text style={globalS.leftTitle}>Talimatlar</Text>
                <View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={style.selectText}>Görevli Personel</Text>
                        {/* {personels && <ComboBox data={personels} setValue={setDirectivedStaff} placeholder={"Personel Seçin.."} />} */}

                    </View>
                    <Text style={[globalS.selectText, globalS.mb12]}>Başlık</Text>
                    <Input mb={12} grayBg onUpdateValue={updateInputValue.bind(this, "directiveTitle")} />
                    <Text style={[globalS.selectText, globalS.mb12]}>Açıklama</Text>
                    <Input textarea mb={12} onUpdateValue={updateInputValue.bind(this, "directiveDesc")} />
                    <View style={[style.flexRight, globalS.mb12]}>
                        <Button style={style.smallBtn} onPress={saveDirective}>Talimat Ver</Button>
                    </View>
                </View>
            </Box>
            {
                isLoading == true &&
                <View style={style.full}>
                    <LoadingItems />
                </View>
            }

            {/* <View style={[globalS.mAuto, globalS.mt16]}>
                <Button onPress={submitHandler}>Kayıt</Button>
            </View> */}
        </>
    );
}

const style = StyleSheet.create({
    full: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 5,
        top: 0,
        left: 0,
        backgroundColor: Colors.whiteOp
    },
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

