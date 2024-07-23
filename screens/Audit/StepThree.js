import { View } from 'react-native';
import Box from '../../components/UI/Box';
import ListItem from '../../components/UI/ListItem';
import Button from '../../components/UI/Button';
import { globalS } from '../../constants/styles';
import { Colors } from '../../constants/colors';


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


export default function StepThree({ projectId, onNext, onPrev }) {

    function onPressHandler(){
        //LOCATION KONTROLLERİ 
        onNext();
    }

    //Proje bilgilerini api ile çekme



    return (
        <Box title={projectInfo.project}>
            <ListItem title="Müşteri" content={projectInfo.customer} />
            <ListItem title="Proje" content={projectInfo.project} />
            {/* <ListItem title="Loc" content={projectInfo.location.lat} /> */}
            <ListItem title="Müşteri Temsilcisi" content={projectInfo.customerRepresentative} />
            <ListItem title="Telefon" content={projectInfo.phone} />
            <ListItem title="E-Posta" content={projectInfo.email} />
            <ListItem title="Adres" content={projectInfo.address} noBorder contentStyle={{ maxWidth: 200 }} />
            <View style={globalS.btnGroup}>
                <Button style={[globalS.btnGray, globalS.btnHalf]} textColor={Colors.black} solidBg onPress={onPrev}>Geri</Button>
                <Button onPress={onPressHandler}>Denetime Başla</Button>
            </View>
        </Box>
    );
}
