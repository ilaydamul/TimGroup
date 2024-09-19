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

    const [projects, setProjects] = useState([]);
    const [projectIdControl, setProjectIdControl] = useState();


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
        setStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        if (step==2) {
            
        }

        setStep(prevStep => prevStep - 1);

    };

    const saveHandler = (item) => {

    }

    return (
        <Layout isBack={true}>
            <View style={[globalS.itemContainer]}>
                {step === 1 && <StepOne onNext={handleNextStep} />}
                {step === 2 && <StepTwo onNext={handleNextStep} onPrev={handlePrevStep} selectedProject={infos.find(info => info.step === 1)?.item}  idControl={projectIdControl} setIdControl={setProjectIdControl} projects={projects} setProjects={setProjects}/>}
                {step === 3 && <StepThree project={infos.find(info => info.step === 2)?.item} onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 4 && <StepFour onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 5 && <StepFive onNext={handleNextStep} onPrev={handlePrevStep} project={infos.find(info => info.step === 2)?.item} />}
                {step === 6 && <StepSix onNext={handleNextStep} infos={infos} />}
            </View>
        </Layout>
    );
}
