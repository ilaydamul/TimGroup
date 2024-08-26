import { View } from 'react-native';
import Box from '../../components/UI/Box';
import ListItem from '../../components/UI/ListItem';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';


export default function StepThree({ project, onNext, onPrev }) {
    function onPressHandler() {
        //LOCATION KONTROLLERİ 
        onNext();
    }

    return (
        <Box title={project.projectName}>
            <ListItem title="Müşteri" content={project.customerName} />
            <ListItem title="Proje" content={project.projectName} />
            <ListItem title="Müşteri Temsilcisi" content={project.operationManagerName} contentStyle={{ maxWidth: 200 }} />
            <ListItem title="Telefon" content={project.customerPhone} />
            <ListItem title="E-Posta" content={project.customerEmail} contentStyle={{ maxWidth: 250 }} />
            <ListItem title="Adres" content={project.address} noBorder contentStyle={{ maxWidth: 200 }} />
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                <Button onPress={onPressHandler}>Denetime Başla</Button>
            </View>
        </Box>
    );
}
