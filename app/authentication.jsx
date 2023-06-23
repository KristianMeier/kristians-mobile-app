import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import * as SQLite from "expo-sqlite"
import GatedContent from "./gatedcontent"
import { useRouter } from "expo-router"
import { useMessageRenderer } from "../hooks/useMessageRenderer"
import { useAuthContext } from "../context/AuthContext"

const db = SQLite.openDatabase("authentication.db")

export default function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [status, showMessage] = useMessageRenderer()
  const { logIn, isLoggedIn } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL);"
      )
    })
  }, [])

  const loginUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE username = ? AND password = ?;",
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            logIn()
          } else {
            showMessage("Invalid username or password.")
          }
        }
      )
    })
  }

  if (isLoggedIn) return <GatedContent />

  return (
    <View style={styles.container}>
      <View>
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
        <TouchableOpacity
          style={styles.button}
          onPress={loginUser}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/registeruser")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/userlist")}>
          <Text style={styles.buttonText}>Registered Users</Text>
        </TouchableOpacity>
        {status ? <Text style={styles.message}>{status}</Text> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
})
