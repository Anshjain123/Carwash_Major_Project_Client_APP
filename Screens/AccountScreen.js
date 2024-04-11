import { StyleSheet, View, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import DatePicker from "react-native-modern-datepicker";
import storage from '../storage';

const AccountScreen = ({ navigation, route }) => {


  const { setloginScreen } = route.params;
  useLayoutEffect(() => {

    navigation.setOptions({

      title: "Account settings",
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitleAlign: 'center',
    })
  }, [])

  const handleLogout = async () => {

    try {
      const key = "ClientloginState";
      setloginScreen(true);
      storage.remove({ key: key })
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddress = () => {
    navigation.navigate("address");
  }

  const handlePassword = () => {
    navigation.navigate("changepassword", { setloginScreen: setloginScreen });
  }

  return (

    <View>

      <Card>
        <TouchableOpacity style={styles.user} >
          <TouchableOpacity onPress={() => handleAddress()} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }} >
            <Text>
              Address
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Card>

      <Card>
        <TouchableOpacity style={styles.user} >
          <TouchableOpacity onPress={() => handlePassword()} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }} >
            <Text>
              Change Password
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Card>


      <View style={{ padding: 15 }}>
        <Button style={styles.btn} onPress={() => handleLogout()} color="red" >Logout</Button>
      </View>

    </View>

  )
}

export default AccountScreen

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    marginBottom: 6,
    justifyContent: 'space-between',
    width: '100%'
  },
  btn: {
    width: '100%',

  }
})