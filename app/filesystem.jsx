import React, { useState, useEffect } from "react"
import { View, Button, Text, StyleSheet, TextInput } from "react-native"
import * as FileSystem from "expo-file-system"

export default function App() {
  const [fileContent, setFileContent] = useState("")
  const [name, onChangeName] = useState("")
  const [age, onChangeAge] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    loadData()
  }, [fileContent])

  const loadData = async () => {
    const fileUri = FileSystem.documentDirectory + "example.json"

    try {
      const content = await FileSystem.readAsStringAsync(fileUri)
      setFileContent(content)
    } catch (error) {}
  }

  const writeFileToSystem = async () => {
    const fileUri = FileSystem.documentDirectory + "example.json"

    try {
      const data = [{ name: name, age: age }]

      const content = JSON.stringify(data)

      await FileSystem.writeAsStringAsync(fileUri, content)
      setFileContent(content)
    } catch (error) {
      setStatus("Error writing file: " + error)
    }
  }

  const editFileInSystem = async () => {
    const fileUri = FileSystem.documentDirectory + "example.json"

    try {
      const existingContent = await FileSystem.readAsStringAsync(fileUri)
      const existingData = JSON.parse(existingContent)

      // Modify the data or add new objects
      const updatedData = [...existingData, { name: name, age: age }]

      const updatedContent = JSON.stringify(updatedData)

      await FileSystem.writeAsStringAsync(fileUri, updatedContent)
      setFileContent(updatedContent)
    } catch (error) {
      console.log("Error editing file:", error)
    }
  }

  const deleteFileFromSystem = async () => {
    const fileUri = FileSystem.documentDirectory + "example.json"

    try {
      await FileSystem.deleteAsync(fileUri)
      setFileContent("")
    } catch (error) {
      console.log("Error deleting file:", error)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {fileContent &&
        JSON.parse(fileContent).map((item, index) => (
          <View
            style={styles.container}
            key={index}>
            {item.name && item.age && (
              <View>
                <Text>Name: {item.name}</Text>
                <Text>Age: {item.age}</Text>
              </View>
            )}
          </View>
        ))}

      <Button
        title="Write File"
        onPress={writeFileToSystem}
      />
      <Button
        title="Edit File"
        onPress={editFileInSystem}
      />
      <Button
        title="Delete File"
        onPress={deleteFileFromSystem}
      />
      <TextInput
        value={name}
        onChangeText={onChangeName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={age}
        style={styles.input}
        onChangeText={onChangeAge}
        placeholder="Age"
      />
      {status && <Text>{status}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    border: "1px solid black",
    backgroundColor: "violet",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
