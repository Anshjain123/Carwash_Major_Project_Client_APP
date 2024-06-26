
import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

import storage from "../storage";


const Login = ({ route, navigation }) => {

    const host = "172.31.66.127";

    const {setloginScreen} = route.params; 

    const [phone, setphone] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useLayoutEffect(() => {

        navigation.setOptions({

            title: "Login",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])

    const storeData = async (data) => {
        console.log("trying to store jwt and user");
        try {

            storage.save({
                key: "ClientloginState",
                data: {
                    "token": data["jwtToken"],
                    "username": data["username"]
                },
                expires: null
            })

            storage.load({key:"ClientloginState"})
            .then(ret => {
                console.log(ret); 
            }).catch(err => {
                console.log(err); 
            }) 
        } catch (error) {
            console.log(error);
        }

    }


    const handlelogin = async () => {
        console.log("Client trying to login");
        // console.log(props); 

        try {

            let res = await fetch(`http://${host}:8080/login/client`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ username: phone, password: password, type: "client" })
            })
            if (res.ok) {
                let response = await res.json();
                console.log(response);
                storeData(response);
                // setIsLoggedIn(true);
                // console.log(response["jwtToken"]);
                setloginScreen(false);

            }

        } catch (error) {
            console.log(error);
        }


        // setphone(phone);
    }

    const handleForgetPassword = () => {
        navigation.navigate("forgetpassword", { setloginScreen: setloginScreen });
    }
    // console.log(phone);
    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
            {/* <StatusBar style="auto" /> */}

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Phone number"
                    placeholderTextColor="#003f5c"
                    // value={phone}
                    
                    onChangeText={(PHONE) => setphone(PHONE)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    // value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button} onPress={() => handleForgetPassword()} >Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => handlelogin()} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});

export default Login
