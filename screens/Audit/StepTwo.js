import { ScrollView, View } from 'react-native';
import Box from '../../components/UI/Box';
import ListButton from '../../components/UI/ListButton';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import { getProjects } from '../../utils/auth';
import LoadingItems from '../../components/UI/LoadingItems';

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
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const [projects, setProjects] = useState([]);

    // console.log(selectedProject);
    useEffect(() => {
        console.log("selectedProject " + selectedProject);
        const projectList = async () => {

            const projectListItems = await getProjects(token, selectedProject);;

            // console.log(projectListItems.list);

            if (projectListItems.result == 1) {
                setProjects(projectListItems.list);
            }
        }

        projectList();

    }, [selectedProject])

    // const projects = organizationProjects[selectedProject].projects;

    return (
        <Box title={"Proje Seçin"}>
            <ScrollView style={globalS.scrollBox}>
                {projects ? projects.map((item, id) => {
                    return <ListButton onPress={() => onNext(item)} key={id}>{item.projectName}</ListButton>;
                }) : <LoadingItems />}
            </ScrollView>
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
            </View>
        </Box>
    );
}
