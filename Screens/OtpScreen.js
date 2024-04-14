import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button } from '@rneui/base';


const OtpScreen = ({ navigation, route }) => {
    const host = "172.31.65.218";

    const { username } = route.params;

    const [otp, setotp] = useState("");

    const handleSubmit = async () => {

        try {

            let res = await fetch(`http://${host}:8080/login/client/validateOtp`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: otp, username: username })
            })
            try {
                // const response = await res.json();
                // console.log(response);
                // console.log(res);

                if (res.status == 200) {
                    // found 
                    // navigation.
                    navigation.navigate("newpassword", { username: username });
                }
            } catch (error) {
                console.log(res.status);
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }} >

            <View style={styles.inputView}>

                <TextInput
                    style={styles.TextInput}
                    placeholder="Otp"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(otp) => setotp(otp)}
                />
            </View>
            <View>

                <Button onPress={() => handleSubmit()} >Submit</Button>
            </View>
        </View>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    TextInput: {
        height: 500,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    inputView: {
        // backgroundColor: "#FFC0CB",
        // borderRadius: 30,
        width: "50%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        display: 'flex',
        borderBottomWidth: 0.5

    },
})