import { View, ScrollView, StyleSheet, Image, Linking, Animated, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import storage from '../storage';
import moment from 'moment';
import DatePicker from "react-native-modern-datepicker";
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';
import { loadStripe } from '@stripe/stripe-js';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import ClientCarDetails from './ClientCarDetails';
import { MaterialIcons } from '@expo/vector-icons';


const Home = ({ route, navigation }) => {

  const [allClientCars, setallClientCars] = useState([]);
  const [image, setimage] = useState(null)
  const [username, setusername] = useState("");
  const [token, settoken] = useState(null);
  const [date, setdate] = useState(null);
  const [open, setopen] = useState(false);
  const [orderId, setorderId] = useState(null);
  const [reload, setreload] = useState(0);
  const [confirmModal, setconfirmModal] = useState(false);

  const { setloginScreen } = route.params;
  // console.log(setloginScreen);


  const getData = async () => {
    setModalVisible(false); 
    let res = await storage.load({ key: "ClientloginState" })
    let username = res.username;
    let token = res.token;





    settoken(token);
    setusername(username);

    // console.log(token, username);

    try {
      let res = await fetch(`http://172.31.65.95:8080/client/getAllClientCars/${username}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }

      })

      try {
        let response = await res.json();
        console.log(response)
        setallClientCars(response);
        // setallAssignedCars(response);

      } catch (error) {
        console.log("problem converting res to res.json in getData in Home");
      }

    } catch (error) {
      console.log("error in home in retrieving all cleaners assigned cars!");
      console.log(error);
    }
  }

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
  }, [navigation]);

  const handleToggle = () => {
    // console.log("Yes toggling")
    setModalVisible(true);
    // console.log(modalVisible)
  }

  useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft: () => (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
          <TouchableOpacity onPress={() => getData()} >
            <AntDesign name="reload1" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
          <TouchableOpacity onPress={() => handleToggle()} >

            <MaterialIcons name="manage-accounts" size={24} color="black" />

          </TouchableOpacity>
        </View>
      ),
      title: "Home",
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitleAlign: 'center',
    })
  }, [])


  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      getData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  )

  const handleAddMedia = (car) => {
    console.log("Adding car media to user")
  }



  // #3498db -> red for plan1 
  // #e74c3c -> blue for plan2 
  // #ffd700 -> golden for plan3


  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'all iamges uploaded successfully'
    });
  }

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Please select date'
    });
  }





  // console.log(date);

  let mode = "calendar";

  const handleAddress = () => {
    navigation.navigate("address");
  }

  const handlePassword = () => {
    navigation.navigate("changepassword", { setloginScreen: setloginScreen });
  }


  const handleConfirm = () => {
    setModalVisible(false);
    setconfirmModal(true);
  }

  const handleLogout = async () => {

    setconfirmModal(false);

    try {
      const key = "ClientloginState";
      setloginScreen(true);
      storage.remove({ key: key })
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(modalVisible);
  return (
    <>
      {/* <View onPress={() => setModalVisible(false)}> */}


      <ScrollView>

        <Toast style={{ zIndex: 1 }} position='top' />

        <View style={styles.container} >
          {/* <Card.Title>Welcome {props.email}</Card.Title> */}
          {allClientCars.map((car, i) => {
            return <ClientCarDetails navigation={navigation} car={car} mode={mode} token={token} showToastError={showToastError} />

          })}

        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}

          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>

                  <TouchableOpacity onPress={() => handleAddress()} style={styles.user} >
                    <Text style={{ fontSize: 16 }} >
                      Address
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handlePassword()} style={styles.user} >
                    <Text style={{ fontSize: 16 }}>
                      Change Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleConfirm()} style={styles.user} >
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }} >
                      Logout
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.modalText}>This is the modal content</Text> */}
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={confirmModal}
            onRequestClose={() => {
              setconfirmModal(!confirmModal);
            }}

          >
            <View style={styles.confirmCenteredView}>
              <View style={styles.modalView}>
                <View>

                  <Text style={{ padding: 10, textAlign: 'center' }} >Are you sure to logout</Text>
                  <View style={{ marginBottom: 10 }} >

                    <Button color="red" title="Ok" onPress={() => handleLogout()} />
                  </View>
                  <View>

                    <Button title="Cancel" onPress={() => setconfirmModal(false)} />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      {/* </View> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 16,
    marginTop: 5,
  },
  modalView: {
    marginTop: 30,

    backgroundColor: 'white',
    borderRadius: 20,
    // width: '90%',
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 50

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection:'row'
    // marginTop: 22,
  },
  confirmCenteredView: {
    flex: 1,
    // flexDirection: "row",
    padding: 20,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-start'
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection:'row'
    marginTop: 22,
  },


});

export default Home







