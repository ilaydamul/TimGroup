import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { globalS } from "../../constants/styles";

export default function Button({ children, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={onPress}
    >
      <LinearGradient colors={["#D92126", "#6D1113"]} style={[styles.button, style]}>
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>

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
    color: Colors.white,
  },
});
