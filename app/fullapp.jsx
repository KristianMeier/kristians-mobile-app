import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('authentication.db')

const checkUserExists = async (username) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?;',
        [username],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users;',
        [],
        (_, { rows }) => {
          resolve(rows._array)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

const Authentication = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);'
      )
    })

    const fetchUsers = async () => {
      try {
        const userList = await getUsers()
        setUsers(userList)
      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleLogin = async () => {
    const userExists = await checkUserExists('exampleuser')
    setAuthenticated(userExists)
  }

  const handleLogout = () => {
    setAuthenticated(false)
  }

  if (!authenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please login to access the user list.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User List</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Text style={styles.user}>{item.username}</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  user: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})

export default Authentication
