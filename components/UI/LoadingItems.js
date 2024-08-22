import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingItems({ message }) {
  return (
    <View style={styles.rootContainer}>
      {/* <Text style={styles.message}>{message}</Text> */}
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingItems;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
//   message: {
//     fontSize: 16,
//     marginBottom: 12,
//   },
});
