import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function Button({ children, onPress, style, solidBg = false, textColor = Colors.white, mt, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, { marginTop: mt }]}
      onPress={onPress}
    >
      {solidBg ? (
        <View style={[styles.button, style]}>
          <Text style={[styles.text, { color: textColor }]}>{children}</Text>
        </View>
      ) : (
        <LinearGradient colors={["#D92126", "#6D1113"]} style={[styles.button, style]}>
          <Text style={[styles.text, { color: textColor }, textStyle]}>{children}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
  },
});
