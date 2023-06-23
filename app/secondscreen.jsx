import { SafeAreaWrapper } from "../components/SafeAreaWrapper"
import { Button, Alert } from "react-native"
import { StyledView } from "../components/styles/StyledView"
import { useState } from "react"
import { StyledText } from "../components/styles/StyledText"
import { colors } from "../constants/colors"
import { Navigation } from "../components/Navigation"

const YoloScreen = () => {
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(null)

  const showAlert = () =>
    Alert.alert("Number of rackets", "Choose number of Rackets", [
      {
        text: "I have 1",
        onPress: () => setCount(1),
      },
      {
        text: "I have 2",
        onPress: () => setCount(2),
      },
      { text: "What's that?" },
    ])

  return (
    <SafeAreaWrapper>
      <Navigation />
      <StyledView>
        <Button
          onPress={() => showAlert()}
          title="How many rackets you have?"
        />
      </StyledView>
      <StyledView>
        <Button
          onPress={() => setShow(!show)}
          title="Toggle the Text on and off"
          color={colors.danger}
        />
      </StyledView>
      {count && (
        <StyledView>
          <StyledText>No. of rackets: {count}</StyledText>
        </StyledView>
      )}
      {show && (
        <StyledView>
          <StyledText>Text that can be toggled on and off</StyledText>
        </StyledView>
      )}
    </SafeAreaWrapper>
  )
}

export default YoloScreen
