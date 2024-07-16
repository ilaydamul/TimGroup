import { View } from 'react-native';
import Box from '../../components/UI/Box';
import ListItem from '../../components/UI/ListItem';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';

export default function StepThree({ projectInfo, onNext, onPrev }) {
    return (
        <Box title={projectInfo.project}>
            <ListItem title="Müşteri" content={projectInfo.customer} />
            <ListItem title="Proje" content={projectInfo.project} />
            <ListItem title="Loc" content={projectInfo.location} />
            <ListItem title="Müşteri Temsilcisi" content={projectInfo.customerRepresentative} />
            <ListItem title="Telefon" content={projectInfo.phone} />
            <ListItem title="E-Posta" content={projectInfo.email} />
            <ListItem title="Adres" content={projectInfo.address} noBorder contentStyle={{ maxWidth: 200 }} />
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                <Button onPress={onNext}>Denetime Başla</Button>
            </View>
        </Box>
    );
}
