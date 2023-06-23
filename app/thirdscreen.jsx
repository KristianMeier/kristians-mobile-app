import { Navigation } from "../components/Navigation"
import { StyleSheet, Text, View, Image } from "react-native"
import { SafeAreaWrapper } from "../components/SafeAreaWrapper"
import { useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { images } from "../assets/images/images"

const ThirdScreen = () => {
  const [tabNumber, setTabNumber] = useState(0)

  const tabs = [1, 2, 3]

  const componentToBeRendered = ({ item }) => (
    <Text
      style={styles.text(item, tabNumber)}
      onPress={() => setTabNumber(item)}>
      {item}
    </Text>
  )

  return (
    <SafeAreaWrapper>
      <Navigation />
      <View style={styles.container}>
        <Image
          style={styles.image(30)}
          source={images.blueArrow}
        />
        <FlatList
          data={tabs}
          renderItem={componentToBeRendered}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
        />
      </View>
    </SafeAreaWrapper>
  )
}

export default ThirdScreen

const styles = StyleSheet.create({
  text: (item, tabNumber) => ({
    color: item === tabNumber ? "red" : "black",
    fontSize: 30,
  }),
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: (size) => ({
    marginBottom: 20,
    width: size,
    height: size,
  }),
})
