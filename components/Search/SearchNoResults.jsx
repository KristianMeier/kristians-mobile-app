import { useRouter } from "expo-router"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import SearchModal from "./SearchModal"
import { standardStyles } from "../../styles/standarStyles"

export const SearchNoResults = () => {
  const router = useRouter()

  return (
    <View style={styles.SearchNoResults}>
      <Text style={styles.messageTitleH3}>No companies found</Text>
      <Text style={styles.p}>
        To see the companies in the database, click beneath:
      </Text>
      <SearchModal />
      <TouchableOpacity
        style={standardStyles.button}
        onPress={() => router.push("/search")}>
        <Text style={standardStyles.buttonText}>Search for a company</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  SearchNoResults: {},
  messageTitleH3: {},
  p: {},
  userHintLink: {},
})
