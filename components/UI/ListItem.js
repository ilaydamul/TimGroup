
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Colors } from '../../constants/colors';
import { useState } from 'react';

export default function ListItem({ title, content, noBorder, listContentBg, style, contentStyle, isRadio }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    return (
        <View style={[styles.listItem, noBorder && styles.noBorder, style]}>
            <Text style={[styles.listTitle, { fontSize: isRadio ? 14 : 16 }]}>{title}</Text>
            {isRadio ?
                <Switch
                    trackColor={{ false: '#FBE6E7', true: "#DCF9DC" }}
                    thumbColor={isEnabled ? '#17D817' : '#D92126'}
                    ios_backgroundColor="#FBE6E7"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                :
                <Text style={[styles.listContent, listContentBg && styles.listContentBg, contentStyle]}>{content}</Text>
            }

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
        fontSize: 18,
        maxWidth: 200,
    },
    listContent: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        textAlign: "right"
    },
    listContentBg: {
        backgroundColor: Colors.gray400,
        borderRadius: 6,
        overflow: "hidden"
    }
});

