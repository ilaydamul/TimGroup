import { View } from 'react-native';
import Layout from '../components/Layout/Layout';
import { globalS } from '../constants/styles';
import StepOne from './Audit/StepOne';
import StepTwo from './Audit/StepTwo';
import StepThree from './Audit/StepThree';
import StepFour from './Audit/StepFour';
import StepFive from './Audit/StepFive';
import StepSix from './Audit/StepSix';
import { useState } from 'react';






const comboBox = [
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Gujrat' },
    { key: '3', value: 'Maharashtra' },
    { key: '4', value: 'Goa' },
];

export default function Audit() {
    const [step, setStep] = useState(1);
    const [image, setImage] = useState(null);
    const [selectedProject, setSelectedProject] = useState();
    const [infos, setInfos] = useState([]);

    const handleNextStep = (item) => {
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

        console.log(infos);

        setStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const saveHandler = () => {

    }

    return (
        <Layout isBack={true}>
            <View style={[globalS.itemContainer]}>
                {step === 1 && <StepOne onNext={handleNextStep} />}
                {step === 2 && <StepTwo onNext={handleNextStep} onPrev={handlePrevStep} selectedProject={infos.find(info => info.step === 1)?.item} />}
                {step === 3 && <StepThree projectId={infos.find(info => info.step === 2)?.item} onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 4 && <StepFour onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 5 && <StepFive onNext={handleNextStep} onPrev={handlePrevStep} projectId={infos.find(info => info.step === 2)?.item}/>}
                {step === 6 && <StepSix onSubmit={saveHandler} />}
            </View>
        </Layout>
    );
}
