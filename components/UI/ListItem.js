
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export default function ListItem({ title, content, noBorder, listContentBg, style, contentStyle }) {
    return (
        <View style={[styles.listItem, noBorder && styles.noBorder, style]}>
            <Text style={styles.listTitle}>{title}</Text>
            <Text style={[styles.listContent, listContentBg && styles.listContentBg, contentStyle]}>{content}</Text>
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
        paddingVertical: 8,
        textAlign:"right"
    },
    listContentBg: {
        backgroundColor: Colors.gray400,
        borderRadius: 6,
        overflow: "hidden"
    }
});

