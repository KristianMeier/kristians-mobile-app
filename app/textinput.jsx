import { useState } from "react"
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native"

const TextInputExample = () => {
  const [text, onChangeText] = useState("Useless Text")
  const [number, onChangeNumber] = useState("")

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Text>{text}</Text>
      <Text>{number}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default TextInputExample
