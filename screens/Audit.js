import { View, Text, Pressable, StyleSheet } from 'react-native'
import Layout from '../components/Layout/Layout'
import { globalS } from '../constants/styles'
import Box from '../components/UI/Box'
import { Colors } from '../constants/colors'
import ListButton from '../components/UI/ListButton'

export default function Audit() {
    return (
        <Layout isBack={true}>
            <View style={style.centeredBox}>
                <View style={[globalS.itemContainer, style.centeredBox]}>
                    <Box title={"Organizasyon Türünü Seçin"}>
                        <ListButton>Güvenlik</ListButton>
                        <ListButton>Tesis</ListButton>
                        <ListButton>Temizlik</ListButton>
                    </Box>
                </View>
            </View>

        </Layout>
    )
}

const style = StyleSheet.create({
    centeredBox: {
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: "100%"

    },
    // h100: {
    //     minHeight: "100%"
    // }
})
