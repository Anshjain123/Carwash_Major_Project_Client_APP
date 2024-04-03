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
import CheckoutPage from './Screens/CheckoutPage';
import SuccessPage from './Screens/SuccessPage';

import { StripeProvider } from '@stripe/stripe-react-native';
import StripeApp from './Screens/StripeApp';
import ClientCarDetails from './Screens/ClientCarDetails';
import AccountScreen from './Screens/AccountScreen';
import storage from './storage';

export default function App() {

  const [loginScreen, setloginScreen] = useState(true);

  const Stack = createNativeStackNavigator();

  const validate = async () => {

    let res = await storage.load({ key: "ClientloginState" })
    let username = res.username;
    let token = res.token;

    let response = await fetch("http://172.31.65.95:8080/client/validateToken", {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if (response.ok) {
      setloginScreen(false);
    }

  }

  useEffect(() => {

    validate();
  }, [])

  return (

    <>


      {loginScreen && <Login setloginScreen={setloginScreen} />}
      {!loginScreen &&

        <StripeProvider publishableKey='pk_test_51OzADOSAbmkAKQN9dP7LTny9r3uqq7sZYRwJbCB4DDTgF0qtklqM4sJLckY313JlzSZYnr6rekjJS8rTS7XGXcCg00TBi8zpxF' >
          <NavigationContainer>

            <Stack.Navigator>
              <Stack.Screen
                initialParams={{ setloginScreen: setloginScreen }}
                name='home'
                component={Home}

              // children={() => <Home email={email} navigation={navigation} />}
              />
              <Stack.Screen

                name='viewmedia'
                component={ViewMedia}
              />
              <Stack.Screen

                name='checkout'
                component={CheckoutPage}
              />

              <Stack.Screen

                name='success'
                component={SuccessPage}
              />

              <Stack.Screen

                name='stripe'
                component={StripeApp}
              />

              <Stack.Screen

                name='clientcardetails'
                component={ClientCarDetails}
              />

              <Stack.Screen

                name='accountscreen'
                component={AccountScreen}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </StripeProvider>
      }
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
