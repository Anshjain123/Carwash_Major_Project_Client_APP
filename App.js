import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './Screens/LoginScreen';
import Home from './Screens/Home';
import Login from './Screens/Login';
import ViewMedia from './Screens/ViewMedia';


export default function App() {

  const [loginScreen, setloginScreen] = useState(true);

  const Stack = createNativeStackNavigator();

  return (

    <>


      {loginScreen && <Login setloginScreen={setloginScreen} />}
      {!loginScreen && <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen

            name='home'
            component={Home}
            
          // children={() => <Home email={email} navigation={navigation} />}
          />
          <Stack.Screen

            name='viewmedia'
            component={ViewMedia}
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
