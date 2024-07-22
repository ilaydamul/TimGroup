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

const organizations = [{ id: 0, title: "Güvenlik" }, { id: 1, title: "Tesis" }, { id: 2, title: "Temizlik" }];
const organizationProjects = [
    {
        title: "Güvenlik",
        projects: [{ id: 0, title: "Güvenlik Projesi" }, { id: 1, title: "Güvenlik Projesi 2" }, { id: 2, title: "Güvenlik Projesi 3" }, { id: 3, title: "Güvenlik Projesi 4" }]
    },
    {
        title: "Tesis",
        projects: [{ id: 0, title: "Tesis Projesi" }, { id: 1, title: "Tesis Projesi 2" }, { id: 2, title: "Tesis Projesi 3" }, { id: 3, title: "Tesis Projesi 4" }]
    },
    {
        title: "Temizlik",
        projects: [{ id: 0, title: "Temizlik Projesi" }, { id: 1, title: "Temizlik Projesi 2" }, { id: 2, title: "Temizlik Projesi 3" }, { id: 3, title: "Temizlik Projesi 4" }]
    }
];

const projectInfo = {
    customer: "Asist Koruma ve Güven",
    project: "Vema Tuzla",
    // location: "40.8489652, 293002849",
    customerRepresentative: "Görkem Okar",
    phone: "0530 178 97 17",
    email: "gorkem@17yonetim.com",
    address: "İçmeler Mah. Çağdaş Sok. 2C/1 Tuzla/İst",
    location: {
        lat: 1234.43,
        long: 2343.43
    }
};

const comboBox = [
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Gujrat' },
    { key: '3', value: 'Maharashtra' },
    { key: '4', value: 'Goa' },
];

export default function Audit() {
    const [step, setStep] = useState(1);
    const [projects, setProjects] = useState();
    const [image, setImage] = useState(null);
    // const [location, setLocation] = useState();

    const handleNextStep = (item) => {
        if (step === 1) {
            setProjects(organizationProjects[item].projects);
        }

        
        
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
                {step === 2 && <StepTwo projects={projects} onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 3 && <StepThree projectInfo={projectInfo} onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 4 && <StepFour image={image} setImage={setImage} onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 5 && <StepFive onNext={handleNextStep} onPrev={handlePrevStep} />}
                {step === 6 && <StepSix onSubmit={saveHandler} />}
            </View>
        </Layout>
    );
}
