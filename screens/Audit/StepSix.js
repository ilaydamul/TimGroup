import { View, Text, StyleSheet, Alert } from 'react-native';
import Box from '../../components/UI/Box';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useContext, useEffect, useState } from 'react';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
// import ComboBox from '../../components/UI/ComboBox';
import Toast from 'react-native-root-toast';
import { AuthContext } from '../../store/auth-context';
import { addAudit, addAuditWarningOrDirective, getPersonelList } from '../../utils/auth';
import { LocationContext } from '../../store/location-context';
import LoadingItems from '../../components/UI/LoadingItems';
import ComboBox2 from '../../components/UI/ComboBox2';
import ToastMessage from '../../components/UI/ToastMessage';

const transationType = [{ label: "Sözlü Uyarı", value: "Sözlü Uyarı" }, { label: "Yazılı Uyarı", value: "Yazılı Uyarı" }];

export default function StepSix({ infos }) {
    const authCtx = useContext(AuthContext);
    const { getLocation } = useContext(LocationContext);
    const token = authCtx.token;

    const { setToastMessage } = useContext(AuthContext);

    const [personels, setPersonels] = useState([]);

    const [customerComment, setCustomerComment] = useState("");
    const [note, setNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [warningDesc, setWarningDesc] = useState("");
    const [directiveTitle, setDirectiveTitle] = useState("");
    const [directiveDesc, setDirectiveDesc] = useState("");
    const [directivedStaff, setDirectivedStaff] = useState('');
    const [warnedStaff, setWarnedStaff] = useState('');
    const [transitionVal, setTransitionVal] = useState('');


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
        if (!warnedStaff || !transitionVal || !warningDesc) {
            setToastMessage({ isShow: true, type: "warning", text: "Uyarı girdilerini doldurunuz!" });
            setTimeout(() => {
                setToastMessage({ isShow: false });
            }, 2000);

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
            if (addAuditWarning2.result == 1) {
                setToastMessage({ isShow: true, type: "success", text: "Uyarı başarılı bir şekilde eklendi." });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 2000);
            } else {
                setToastMessage({ isShow: true, type: "warning", text: "Uyarı eklerken bir sorun oluştu." });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 2000);
            }

        } catch (error) {
            Toast.show('Hata: ' + error, {
                duration: 2000,
            });
        }

        setIsLoading(false);
    }

    async function saveDirective() {
        if (!directivedStaff || !directiveDesc || !directiveTitle) {
            setToastMessage({ isShow: true, type: "warning", text: "Talimat girdilerini doldurunuz!" });
            setTimeout(() => {
                setToastMessage({ isShow: false });
            }, 2000);

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
            if (addAuditDirective2.result === 1) {
                setToastMessage({ isShow: true, type: "success", text: "Talimat başarılı bir şekilde eklendi." });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 2000);
            } else {
                setToastMessage({ isShow: true, type: "warning", text: "Talimat eklerken bir sorun oluştu." });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 2000);
            }

        } catch (error) {
            Toast.show('Hata: ' + error, {
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

            if (response.result == 1) {
                setToastMessage({ isShow: true, type: "success", text: "Denetim kaydı başarıyla eklendi." });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 2000);
            }
            else if (response.result == 2) {
                setToastMessage({ isShow: true, type: "warning", text: "Alan dışındasınız. Lütfen proje alanına giriniz." });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 2000);
            }
            else {
                setToastMessage({ isShow: true, type: "warning", text: response.msg });
                setTimeout(() => {
                    setToastMessage({ isShow: false });
                }, 2000);
            }

            setIsLoading(false);

        } catch (error) {
            Toast.show('Hata: ' + error, {
                duration: 2000,
            });

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
                {/* <View style={[style.flexRight, globalS.mb12]}>
                    <Button style={style.smallBtn} onPress={submitHandler}>Kaydet</Button>
                </View> */}
                <Text style={globalS.leftTitle}>Uyarılar</Text>
                <View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={style.selectText}>Görevli Personel</Text>
                        {personels && <ComboBox2 data={personels} setValue={setWarnedStaff} placeholder={"Personel Seçin.."} />}

                    </View>
                    <View style={[globalS.dFlexCenterBetween, globalS.mb12]}>
                        <Text style={globalS.selectText}>İşlem</Text>
                        <ComboBox2 data={transationType} setValue={setTransitionVal} placeholder={"Uyarı Seçin.."} />
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
                        {personels && <ComboBox2 data={personels} setValue={setDirectivedStaff} placeholder={"Personel Seçin.."} />}

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

            <View style={[globalS.mAuto, globalS.mt16]}>
                <Button onPress={submitHandler}>Denetimi Bitir</Button>
            </View>
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

