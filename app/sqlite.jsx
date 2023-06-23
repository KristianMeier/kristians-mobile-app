import React, { useEffect, useState } from "react"
import { View, Button, Text } from "react-native"
import * as SQLite from "expo-sqlite"

export default function App() {
  const [database, setDatabase] = useState(null)
  const [fileContent, setFileContent] = useState([])

  useEffect(() => {
    openDatabase()
  }, [])

  const openDatabase = () => {
    const db = SQLite.openDatabase("example.db", "1.0")
    setDatabase(db)
  }

  useEffect(() => {
    if (database) {
      createTable()
      fetchFileContent()
    }
  }, [database])

  const createTable = () => {
    database.transaction((tx) => {
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
    database.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO data (name, age) VALUES (?, ?);",
        ["John", 30],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Data written successfully!")
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
    database.transaction((tx) => {
      tx.executeSql("SELECT * FROM data;", [], (_, { rows }) => {
        setFileContent(rows._array)
        console.log("File content:", rows._array)
      })
    })
  }

  const editFileInDatabase = () => {
    database.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO data (name, age) VALUES (?, ?);",
        ["Jane", 25],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Data edited successfully!")
          } else {
            console.log("Error editing data.")
          }
        },
        (_, error) => {
          console.log("Error editing data:", error)
        }
      )
    })
  }

  const deleteFileFromDatabase = () => {
    database.transaction((tx) => {
      tx.executeSql("DELETE FROM data;", [], (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log("Data deleted successfully!")
          setFileContent([])
        } else {
          console.log("Error deleting data.")
        }
      })
    })
  }

  if (!database) {
    return null // Render nothing until the database is available
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify(fileContent)}</Text>
      <Button
        title="Write Data"
        onPress={writeFileToDatabase}
      />
      <Button
        title="Read Data"
        onPress={fetchFileContent}
      />
      <Button
        title="Edit Data"
        onPress={editFileInDatabase}
      />
      <Button
        title="Delete Data"
        onPress={deleteFileFromDatabase}
      />
    </View>
  )
}
