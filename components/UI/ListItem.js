
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export default function ListItem({ title, content, noBorder, listContentBg }) {
    return (
        <View style={[styles.listItem, noBorder && styles.noBorder]}>
            <Text style={styles.listTitle}>{title}</Text>
            <Text style={[styles.listContent, listContentBg && styles.listContentBg]}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        borderBottomColor: Colors.gray200,
        borderBottomWidth: 1.5,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    noBorder: {
        borderBottomWidth: 0
    },
    listTitle: {
        fontSize: 18
    },
    listContent: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    listContentBg: {
        backgroundColor: Colors.gray400,
        borderRadius: 6,
        overflow: "hidden"
    }
});

