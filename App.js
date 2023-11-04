import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './Screens/LoginScreen';
import Home from './Screens/Home';
import Login from './Screens/Login';


export default function App() {

  const [loginScreen, setloginScreen] = useState(true);
  const [phone, setphone] = useState(null)

  const Stack = createNativeStackNavigator();

  return (

    <>


      {loginScreen && <Login setloginScreen={setloginScreen} setphone={setphone} />}
      {!loginScreen && <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen

            name='Home'
            component={Home}
            initialParams={{ phone: phone }}
          // children={() => <Home email={email} navigation={navigation} />}
          />
          
        </Stack.Navigator>
      </NavigationContainer>}
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
