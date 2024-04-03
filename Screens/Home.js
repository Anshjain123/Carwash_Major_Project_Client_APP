import { View, ScrollView, StyleSheet, Image, Linking, Animated, Modal, TouchableOpacity } from 'react-native';
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


  const {setloginScreen} = route.params;
  // console.log(setloginScreen);


  const getData = async () => {
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

  useEffect(() => {
    getData();
  }, [navigation]);


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
          <TouchableOpacity onPress={() => navigation.navigate("accountscreen", { setloginScreen: setloginScreen })} >
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

  return (
    <>
      <ScrollView>
        <Toast style={{ zIndex: 1 }} position='top' />

        <View style={styles.container}>
          {/* <Card.Title>Welcome {props.email}</Card.Title> */}
          {allClientCars.map((car, i) => {
            return <ClientCarDetails navigation={navigation} car={car} mode={mode} token={token} showToastError={showToastError} />

          })}

        </View>
      </ScrollView>
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
    marginBottom: 6,
    justifyContent: 'space-between',

  },

  name: {
    fontSize: 16,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5

  }
});

export default Home










// const users = [
//     {
//         name: 'brynn',
//         avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
//     },
//     {
//         name: 'thot leader',
//         avatar:
//             'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
//     },
//     {
//         name: 'jsa',
//         avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
//     },
//     {
//         name: 'talhaconcepts',
//         avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
//     },
//     {
//         name: 'andy vitale',
//         avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
//     },
//     {
//         name: 'katy friedson',
//         avatar:
//             'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
//     },
// ];