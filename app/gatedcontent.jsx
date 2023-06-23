import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useAuthContext } from "../context/AuthContext"
import { useRouter } from "expo-router"

const GatedContent = () => {
  const { isLoggedIn, logOut } = useAuthContext()
  const router = useRouter()

  if (isLoggedIn)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You are now logged in.</Text>
        <Text style={styles.text}>This is Gated content</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => logOut()}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You do not have access</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/authentication")}>
        <Text style={styles.buttonText}>To Login Screen</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
})

export default GatedContent
