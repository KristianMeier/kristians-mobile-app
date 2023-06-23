import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import * as SQLite from "expo-sqlite"
import { useRouter } from "expo-router"
import { useMessageRenderer } from "../hooks/useMessageRenderer"

const db = SQLite.openDatabase("authentication.db")

const RegisterUser = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [status, showMessage] = useMessageRenderer()
  const router = useRouter()

  const registerUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (username, password) VALUES (?, ?);",
        [username, password],
        (_, { insertId }) => {
          if (insertId) {
            showMessage("User registered successfully.")
          } else {
            showMessage("Failed to register user.")
          }
        }
      )
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={registerUser}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/authentication")}>
          <Text style={styles.buttonText}>Login Screen</Text>
        </TouchableOpacity>
      </View>
      {status ? <Text style={styles.message}>{status}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  credentialsContainer: {
    marginTop: 20,
  },
  credentialsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
})

export default RegisterUser
