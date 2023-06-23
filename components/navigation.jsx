import { navigationData } from "../constants/navigationData"
import { StyledView } from "./styles/StyledView"
import { FlatList, Text, StyleSheet, View, StatusBar } from "react-native"
import { StyledLink } from "./styles/StyledLink"

export const Navigation = () => {
  const componentToBeMappedOver = ({ item }) => (
    <View style={styles.container}>
      <StyledLink path={item.path}>
        <Text>{item.text}</Text>
      </StyledLink>
    </View>
  )

  return (
    <StyledView>
      <FlatList
        data={navigationData}
        renderItem={componentToBeMappedOver}
        keyExtractor={(item) => item.path}
        numColumns={3}
      />
    </StyledView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
})
