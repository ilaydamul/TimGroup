import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Box from '../../components/UI/Box';
import Button from '../../components/UI/Button';
import ListItem from '../../components/UI/ListItem';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';

export default function StepFive({ onNext, onPrev, projectId }) {
    const [point, setPoint] = useState(0);
    const [questions, setQuestions] = useState([
        { id: 0, question: "Güvenlik personeli nöbet kulübesi veya devriye yapması gereken alanda mı?", value: false },
        { id: 1, question: "Güvenlik personelinin kimliği takılı mı?", value: false },
        { id: 2, question: "Proje personel kadro sayısı tam mı?", value: false }
    ]);
    const [perPoint, setPerPoint] = useState(0); // Initialize perPoint state
    const [truePoint, setTruePoint] = useState(0); // Initialize truePoint state

    useEffect(() => {
        // Calculate perPoint whenever questions length changes
        setPerPoint(100 / questions.length);
    }, [questions.length]); // Ensure useEffect runs whenever questions length changes

    function onSubmitHandler() {
        // onSubmit logic
        // onNext(questions);
    }

    const toggleSwitch = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].value = !newQuestions[index].value;
        setQuestions(newQuestions);

        if (newQuestions[index].value) {
            setPoint((prevPoint) => prevPoint + perPoint);
            setTruePoint((prevTruePoint) => prevTruePoint + 1);
        } else {
            if (truePoint === 0) {
                setPoint(0);
            } else {
                setPoint((prevPoint) => prevPoint - perPoint);
                setTruePoint((prevTruePoint) => prevTruePoint - 1);
            }
        }
    };

    
    return (
        <Box title={"Değerlendirme"}>
            {questions.map((item, index) => (
                <ListItem
                    key={item.id}
                    title={item.question}
                    isRadio
                    radioValue={item.value}
                    onToggle={() => toggleSwitch(index)}
                />
            ))}
            <Text style={styles.textBox}>Toplam Değerlendirme Puanı: {Math.floor(point)}</Text>
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                <Button style={globalS.btnHalf} onPress={onSubmitHandler}>Devam</Button>
            </View>
        </Box>
    );
}

const styles = StyleSheet.create({
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
