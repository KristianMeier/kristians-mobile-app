import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("authentication.db")

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM users;", [], (_, { rows }) => {
        setUsers(rows._array)
      })
    })
  }, [users])

  const clearUsers = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM users;", [], () => {
        console.log("Users cleared successfully.")
      })
    })
  }

  const renderUserItem = ({ item }) => {
    return (
      <View style={styles.userItem}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.password}>{item.password}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={clearUsers}>
        <Text style={styles.buttonText}>Clear Users</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  password: {
    fontSize: 18,
    color: "gray",
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

export default UserList
