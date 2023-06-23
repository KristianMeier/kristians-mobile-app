import { useSearchContext } from "../../context/SearchContext"
import { Search } from "./Search"
import { TextInput, StyleSheet, Text, View } from "react-native"

export const SearchWrapper = () => {
  const { searchField, setSearchField } = useSearchContext()

  return (
    <View style={styles.search}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchTitleH2}>Search the CVR</Text>
        <TextInput
          value={searchField}
          placeholder="Search for the company here..."
          onChangeText={(text) => setSearchField(text)}
        />
        <Search />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  search: {},
  searchContainer: {},
  searchTitleH2: {},
})
