import React, { useEffect, useState } from "react"
import { View, Button, Text, StyleSheet, ScrollView } from "react-native"
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("example.db")

export default function App() {
  const [fileContent, setFileContent] = useState([])

  useEffect(() => {
    createTable()
    fetchFileContent()
  }, [])

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);",
        [],
        (_, error) => {
          if (error) {
            console.log("Error creating table:", error)
          } else {
            console.log("Table created successfully!")
          }
        }
      )
    })
  }

  const writeFileToDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO data (name, age) VALUES (?, ?);",
        ["John", 30],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Data written successfully!")
            fetchFileContent()
          } else {
            console.log("Error writing data.")
          }
        },
        (_, error) => {
          console.log("Error writing data:", error)
        }
      )
    })
  }

  const fetchFileContent = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM data;", [], (_, { rows }) => {
        setFileContent(rows._array)
        console.log("File content:", rows._array)
      })
    })
  }

  const clearAllData = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM data;", [], (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log("All data deleted successfully!")
          fetchFileContent()
        } else {
          console.log("Error deleting all data.")
        }
      })
    })
  }

  const editPersonInDatabase = (id, newName, newAge) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE data SET name = ?, age = ? WHERE id = ?;",
        [newName, newAge, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Person edited successfully!")
            fetchFileContent()
          } else {
            console.log("Error editing person.")
          }
        },
        (_, error) => {
          console.log("Error editing person:", error)
        }
      )
    })
  }

  const deletePersonFromDatabase = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM data WHERE id = ?;",
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Person deleted successfully!")
            fetchFileContent()
          } else {
            console.log("Error deleting person.")
          }
        },
        (_, error) => {
          console.log("Error deleting person:", error)
        }
      )
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>File Content:</Text>
      <View style={styles.listContainer}>
        {fileContent.map((item) => (
          <View
            key={item.id}
            style={styles.row}>
            <Text style={styles.text}>
              {item.name} (Age: {item.age})
            </Text>
            <Button
              title="Delete"
              onPress={() => deletePersonFromDatabase(item.id)}
              color="#ff0000"
            />
            <Button
              title="Edit"
              onPress={() =>
                editPersonInDatabase(item.id, "Updated Name", item.age)
              }
              color="#008000"
            />
          </View>
        ))}
      </View>
      <Button
        title="Write Data"
        onPress={writeFileToDatabase}
        style={styles.button}
      />
      <Button
        title="Clear All Data"
        onPress={clearAllData}
        style={styles.button}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    marginBottom: 10,
  },
})
