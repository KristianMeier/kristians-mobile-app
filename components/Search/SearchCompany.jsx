import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

export const SearchCompany = ({ convertedData, index }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/company/${index}`)}
      style={styles.searchCompany}>
      <View style={styles.searchArticle}>
        {convertedData.map(({ title, paragraphOne, paragraphTwo }, index) => (
          <View
            style={styles.searchContent}
            key={title + index}>
            <Text styles={styles.h4}> {title} </Text>
            <Text style={styles.p}> {paragraphOne} </Text>
            <Text tyle={styles.p}>{paragraphTwo} </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  searchCompany: {},
  searchArticle: {},
  searchContent: {},
  h4: {},
  p: {},
})
