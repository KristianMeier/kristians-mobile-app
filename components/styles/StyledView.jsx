import { StyleSheet, View } from "react-native"

export const StyledView = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    border: "1px solid darkblue",
    alignItems: "center",
    justifyContent: "center",
  },
})
