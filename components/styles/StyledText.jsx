import { Text, StyleSheet } from "react-native"

export const StyledText = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: "darkblue",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    padding: 10,
  },
})
