import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Card } from '@rneui/base'
import storage from '../storage'
import Toast from 'react-native-toast-message';

const ChangePassword = ({ navigation, route }) => {

    const { setloginScreen } = route.params;

    useLayoutEffect(() => {

        navigation.setOptions({

            title: "Change Password",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])

    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const showToastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'Password Changed successfully'
        });

        

    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'not able to change password please try again'
        });
    }

    const handleSubmit = async () => {

        let res = await storage.load({ key: "ClientloginState" })
        let username = res.username;
        let token = res.token;

        let body = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        try {
            let response = await fetch(`http://172.31.65.95:8080/client/changePassword/${username}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            console.log(response);

            if (response.status == 200) {
                showToastSuccess();

                try {
                    const key = "ClientloginState";
                    setloginScreen(true);
                    storage.remove({ key: key })
                } catch (error) {
                    console.log(error);
                }
            } else {
                showToastError();
            }

            // try {
            //     let res = await response.json();
            //     console.log(res);
            // } catch (error) {
            //     console.log("error in converting response to json");
            // }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View>
            <Toast style={{ zIndex: 1 }} position='top' />
            <Card style={{ zIndex: -1 }} >
                <View style={styles.user} >
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }} >

                        {/* <Text style={styles.name}>Address Line - </Text> */}
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Old password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            // value={password}
                            onChangeText={(password) => setoldPassword(password)}
                        />
                    </View>




                </View>
            </Card>
            <Card >
                <View style={styles.user} >
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }} >

                        {/* <Text style={styles.name}>Address Line - </Text> */}
                        <TextInput
                            style={styles.TextInput}
                            placeholder="New Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            // value={password}

                            onChangeText={(password) => setnewPassword(password)}
                        />
                    </View>
                </View>
            </Card>
            <View style={{ padding: 15 }}>
                <Button style={styles.btn} onPress={() => handleSubmit()} >Submit</Button>
            </View>

        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        borderWidth: 0.3,

        // marginLeft: 20,
    },
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
        // fontSize: 16,
        // marginTop: 5,
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

    },
    btn: {
        width: '100%',

    }
})