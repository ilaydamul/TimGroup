import { View, Text, StyleSheet, Switch } from 'react-native';
import { Colors } from '../../constants/colors';
import { useState } from 'react';

export default function ListItem({ title, content, noBorder, listContentBg, style, contentStyle, isRadio, onToggle, radioValue, column }) {
    const [isEnabled, setIsEnabled] = useState(false);
    
    // content'in array olup olmadığını kontrol et
    const isArrayContent = Array.isArray(content);

    return (
        <View style={[styles.listItem, noBorder && styles.noBorder, column && styles.column, style]}>
            <Text style={[styles.listTitle, { fontSize: isRadio ? 14 : 16 }]}>{title}</Text>
            {isRadio ? (
                <Switch
                    trackColor={{ false: '#FBE6E7', true: "#DCF9DC" }}
                    thumbColor={radioValue ? '#17D817' : '#D92126'}
                    ios_backgroundColor="#FBE6E7"
                    onValueChange={onToggle}
                    value={radioValue}
                />
            ) : (
                // content bir array ise her bir elemanı listele
                isArrayContent ? (
                    <View style={[listContentBg && styles.listContentBg]}>
                        {content.map((item, index) => (
                            <Text key={index} style={[styles.listContent, column && styles.columnText, contentStyle]}>
                                {item}
                            </Text>
                        ))}
                    </View>
                ) : (
                    // content array değilse, normal text olarak göster
                    <Text style={[styles.listContent, listContentBg && styles.listContentBg, column && styles.columnText, contentStyle]}>
                        {content}
                    </Text>
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        borderBottomColor: Colors.gray200,
        borderBottomWidth: 1.5,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    column: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
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
        // backgroundColor: Colors.gray400,
        // borderRadius: 6,
        // overflow: "hidden"
    },
    columnText: {
        textAlign: "left",
        paddingHorizontal: 0
    }
});
