import { Linking, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

export const StyledLink = ({ path, children }) => {
  const router = useRouter()

  if (path.includes("http")) {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(path)}>
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={() => router.push(path)}>
      {children}
    </TouchableOpacity>
  )
}
