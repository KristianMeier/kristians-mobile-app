import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../constants/colors"

export const SafeAreaWrapper = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
      {children}
    </SafeAreaView>
  )
}
