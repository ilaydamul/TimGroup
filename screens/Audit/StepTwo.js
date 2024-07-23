import { ScrollView, View } from 'react-native';
import Box from '../../components/UI/Box';
import ListButton from '../../components/UI/ListButton';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';

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

export default function StepTwo({ onNext, onPrev, selectedProject }) {

    // console.log(selectedProject);

    const projects = organizationProjects[selectedProject].projects;

    return (
        <Box title={"Proje Seçin"}>
            <ScrollView style={globalS.scrollBox}>
                {projects.map((item, id) => {
                    return <ListButton onPress={() => onNext(item.id)} key={id}>{item.title}</ListButton>;
                })}
            </ScrollView>
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
            </View>
        </Box>
    );
}
