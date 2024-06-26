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
import { AntDesign } from '@expo/vector-icons';
import { StripeProvider } from '@stripe/stripe-react-native';
import StripeApp from './Screens/StripeApp';
import ClientCarDetails from './Screens/ClientCarDetails';
import AccountScreen from './Screens/AccountScreen';
import storage from './storage';
import Address from './Screens/Address';
import MapScreen from './Screens/MapScreen';
import ChangePassword from './Screens/ChangePassword';
import TransactionHistory from './Screens/TransactionHistory';
import { TouchableOpacity } from 'react-native';
import ForgetPassword from './Screens/ForgetPassword';
import OtpScreen from './Screens/OtpScreen';
import NewPassword from './Screens/NewPassword';

export default function App() {

  const [loginScreen, setloginScreen] = useState(true);

  const Stack = createNativeStackNavigator();
  const host = "172.31.66.127";
  const validate = async () => {

    let res = await storage.load({ key: "ClientloginState" })
    let username = res.username;
    let token = res.token;

    let response = await fetch(`http://${host}:8080/client/validateToken`, {
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




      <StripeProvider publishableKey='pk_test_51OzADOSAbmkAKQN9dP7LTny9r3uqq7sZYRwJbCB4DDTgF0qtklqM4sJLckY313JlzSZYnr6rekjJS8rTS7XGXcCg00TBi8zpxF' >
        <NavigationContainer>

          <Stack.Navigator>
            {!loginScreen && <Stack.Screen
              initialParams={{ setloginScreen: setloginScreen }}
              name='home'
              component={Home}

            // children={() => <Home email={email} navigation={navigation} />}
            />}
            {!loginScreen && <Stack.Screen

              name='viewmedia'
              component={ViewMedia}
            />}
            {!loginScreen && <Stack.Screen

              name='checkout'
              component={CheckoutPage}
            />}

            {!loginScreen && <Stack.Screen

              name='address'
              component={Address}


            />}

            {!loginScreen && <Stack.Screen

              name='changepassword'
              component={ChangePassword}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                  </TouchableOpacity>
                ),

              })}
            />}

            {!loginScreen && <Stack.Screen

              name='success'
              component={SuccessPage}
            />}
            {!loginScreen && <Stack.Screen

              name='transaction'
              component={TransactionHistory}
            />}
            {!loginScreen && <Stack.Screen

              name='stripe'
              component={StripeApp}
            />}

            {!loginScreen && <Stack.Screen

              name='clientcardetails'
              component={ClientCarDetails}
            />}

            {!loginScreen && <Stack.Screen

              name='map'
              component={MapScreen}
            />}

            {!loginScreen && <Stack.Screen

              name='accountscreen'
              component={AccountScreen}
            />}


            {loginScreen && <Stack.Screen

              name='login'
              component={Login}
              initialParams={{ setloginScreen: setloginScreen }}
            />}
            {loginScreen && <Stack.Screen

              name='forgetpassword'
              component={ForgetPassword}
            />}


            {loginScreen && <Stack.Screen

              name='otpscreen'
              component={OtpScreen}
            />}
            {loginScreen && <Stack.Screen

              name='newpassword'
              component={NewPassword}
            />}

            {/* {loginScreen && <Login setloginScreen={setloginScreen} />} */}

          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>

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
