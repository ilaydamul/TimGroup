import { View } from 'react-native';
import Box from '../../components/UI/Box';
import ListButton from '../../components/UI/ListButton';

const organizations = [{ id: 0, title: "Güvenlik" }, { id: 1, title: "Tesis" }, { id: 2, title: "Temizlik" }];

export default function StepOne({ onNext }) {
    return (
        <Box title={"Organizasyon Türünü Seçin"}>
            {organizations.map((item, id) => {
                return <ListButton onPress={() => onNext(item.id)} key={id}>{item.title}</ListButton>;
            })}
        </Box>
    );
}
