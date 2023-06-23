import { useCallback, useState } from "react"
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { set } from "react-native-reanimated"

const App = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setData((previousState) => [...previousState, 11, 12, 13, 14, 15])
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Text>Pull down to see RefreshControl indicator</Text>
        {/* Her map'er jeg, da den brokker sig over en Flatlist (virtual list)
        inde i en anden (ScrollView) */}
        {data.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default App
