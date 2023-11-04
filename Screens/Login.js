
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";


const Login = ({ setloginScreen, setphone, navigation }) => {

    const [Phone, setPhone] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlelogin = () => {
        console.log("Client trying to login");
        // console.log(props); 
        setloginScreen(false);
        setphone(Phone);
    }
    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
            {/* <StatusBar style="auto" /> */}

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Phone number"
                    placeholderTextColor="#003f5c"
                    onChangeText={(phone) => setPhone(phone)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
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
