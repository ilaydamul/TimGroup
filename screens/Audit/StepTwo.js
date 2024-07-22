import { ScrollView, View } from 'react-native';
import Box from '../../components/UI/Box';
import ListButton from '../../components/UI/ListButton';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';

export default function StepTwo({ projects, onNext, onPrev }) {
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
