import { Image, StyleSheet } from "react-native"

export const StyledImage = ({ source, size }) => {
  return (
    <Image
      source={source}
      style={size === "small" ? styles.logoSmall : styles.logoLarge}
    />
  )
}

const styles = StyleSheet.create({
  logoSmall: {
    width: 50,
    height: 50,
    margin: 50,
  },
  logoLarge: {
    width: 100,
    height: 100,
    margin: 50,
  },
})
