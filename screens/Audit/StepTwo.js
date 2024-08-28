import { ScrollView, View, Text } from 'react-native';
import Box from '../../components/UI/Box';
import ListButton from '../../components/UI/ListButton';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import { getProjectDetails, getProjects } from '../../utils/auth';
import LoadingItems from '../../components/UI/LoadingItems';

export default function StepTwo({ onNext, onPrev, selectedProject, idControl, setIdControl, projects, setProjects }) {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const projectList = async () => {
            setLoading(true);
            const projectListItems = await getProjects(token, selectedProject);

            if (projectListItems.result == 1) {
                if (projectListItems.list.length != 0) {
                    setProjects(projectListItems.list);
                } else {
                    setProjects([]);
                }
            }

            setIdControl(selectedProject);
            setLoading(false);
        }


        if (idControl !== selectedProject) {
            projectList();
        }
        else {
            setLoading(false);
        }

    }, [selectedProject])

    const pressHandler = async (item) => {
        const projectDetails = await getProjectDetails(token, item.id);
        onNext(projectDetails.project);
    }

    return (
        <Box title={"Proje Seçin"}>
            <ScrollView style={globalS.scrollBox}>
                {loading ? (
                    <LoadingItems />
                ) : projects && projects.length === 0 ? (
                    <Text>Bu kategoride proje bulunmamaktadır.</Text>
                ) : (
                    projects.map((item, id) => (
                        <ListButton onPress={() => pressHandler(item)} key={id}>
                            {item.projectName}
                        </ListButton>
                    ))
                )}
            </ScrollView>
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
            </View>
        </Box>
    );
}
