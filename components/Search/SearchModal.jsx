import { useState } from "react"
import { Modal, StyleSheet, Text, Pressable, View } from "react-native"
import { useSearchContext } from "../../context/SearchContext"
import { standardStyles } from "../../styles/standarStyles"

const SearchModal = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { allCompanies } = useSearchContext()

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              {allCompanies.map((company) => (
                <Text key={company.companyName}>{company.companyName}</Text>
              ))}
            </View>
            <Pressable
              style={standardStyles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={standardStyles.buttonText}>Luk</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={standardStyles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={standardStyles.buttonText}>The Companies</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
})

export default SearchModal
