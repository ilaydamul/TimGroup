import { View } from 'react-native';
import Layout from '../components/Layout/Layout';
import { globalS } from '../constants/styles';
import { useState } from 'react';

//STEPS
import StepOne from './Audit/StepOne';
import StepTwo from './Audit/StepTwo';
import StepThree from './Audit/StepThree';
import StepFour from './Audit/StepFour';
import StepFive from './Audit/StepFive';
import StepSix from './Audit/StepSix';


export default function Audit() {
    const [step, setStep] = useState(1);
    const [infos, setInfos] = useState([]);

    const updateInfos = (item) => {
        let found = false;

        const updatedInfos = infos.map(info => {
            if (info.step === step) {
                found = true;
                return { ...info, item };
            }
            return info;
        });

        if (!found) {
            updatedInfos.push({ step, item });
        }

        setInfos(updatedInfos);
    }


    const handleNextStep = (item) => {
        updateInfos(item);
        // console.log(infos);

        infos.forEach((item, id) => {
            console.log("Step " + (id + 1) + " İçerik: " + item.item);

        })


        setStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const saveHandler = (item) => {
        //API ile bilgiler gönderilecek
        // console.log("item");
        // console.log(item);
        
        updateInfos(item);

        // console.log(infos);
        // console.log(infos[0]); // Organizasyonlar 
        // console.log(infos[1]); // Projeler **
        // console.log(infos[2]); // Hiçbir şey gelmiyor, gelmeyecek - Proje id alınacak **
        // console.log(infos[3]); // Fotoğraf bilgileri **
        // console.log(infos[4]); // Denetim soruları **
        console.log(infos[5]); // Diğer bilgiler, talimat ve uyarılar


        //Step 4 5 6 bilgileri api ile gönderilecek


    }

    return (
        <Layout isBack={true}>
            <View style={[globalS.itemContainer]}>
                {step === 1 && <StepOne onNext={handleNextStep} />}
                {step === 2 && <StepTwo onNext={handleNextStep} onPrev={handlePrevStep} selectedProject={infos.find(info => info.step === 1)?.item} />}
                {step === 3 && <StepThree projectId={infos.find(info => info.step === 2)?.item} onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 4 && <StepFour onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 5 && <StepFive onNext={handleNextStep} onPrev={handlePrevStep} projectId={infos.find(info => info.step === 2)?.item} />}
                {step === 6 && <StepSix onNext={handleNextStep} onSubmit={saveHandler} />}
            </View>
        </Layout>
    );
}
