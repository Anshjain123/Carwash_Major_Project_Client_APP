import { StyleSheet, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import moment from 'moment'
import { Text, Card, Button, Icon } from '@rneui/themed';
import storage from '../storage';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';
const Address = ({ navigation, route }) => {

    const host = " 172.31.66.127";

    useLayoutEffect(() => {

        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("home")}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            ),
            title: "Address",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])


    const [orgaddressLine, setorgaddressLine] = useState("");
    const [orgcity, setorgcity] = useState("");
    const [orgpincode, setorgpincode] = useState("");
    const [orgstate, setorgstate] = useState("");


    const [addressLine, setaddressLine] = useState("");
    const [city, setcity] = useState("");
    const [pincode, setpincode] = useState("");
    const [state, setstate] = useState("");
    const addressLineRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const pincodeRef = useRef(null);

    const [cnt, setcnt] = useState(0)


    const getClientAddress = async () => {

        let res = await storage.load({ key: "ClientloginState" })
        let username = res.username;
        let token = res.token;


        try {
            let response = await fetch(`http://${host}:8080/client/getClientAddress/${username}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })

            try {
                let res = await response.json();
                console.log(res);
                setaddressLine(res[0].addressLine);
                setpincode(res[0].pincode);
                setcity(res[0].city);
                setstate(res[0].state);

                setorgaddressLine(res[0].addressLine);
                setorgpincode(res[0].pincode);
                setorgcity(res[0].city);
                setorgstate(res[0].state);
            } catch (error) {
                console.log("error in converting res to json");
            }
        } catch (error) {
            console.log(error);
        }




    }

    useEffect(() => {
        getClientAddress();
    }, [])

    // console.log("type of pincode -> ", typeof (pincode), typeof (toString(pincode)));
    const handleReset = () => {
        setaddressLine(orgaddressLine);
        setcity(orgcity);
        setstate(orgstate);
        setpincode(orgpincode);
        setcnt(cnt + 1);
    }
    const showToastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'Address updated successfully'
        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'not able to update address please try again'
        });
    }

    const handleApplyChanges = async () => {

        let res = await storage.load({ key: "ClientloginState" })
        let username = res.username;
        let token = res.token;

        let address = {
            addressLine: addressLine,
            city: city,
            state: state,
            pincode: pincode
        }

        console.log(address);

        try {
            let response = await fetch(`http://${host}:8080/client/updateAddress/${username}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(address)
            })
            console.log(response);

            if (response.status == 200) {
                showToastSuccess();
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

            <View style={{ zIndex: -1 }} >


                <Card >
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >

                            <Text style={styles.name}>Address Line - </Text>
                            <TextInput defaultValue={addressLine} ref={addressLineRef} onChangeText={(addressLine) => setaddressLine(addressLine)} />
                        </View>
                        <TouchableOpacity onPress={() => addressLineRef.current.focus()}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>

                    </View>
                </Card>

                <Card>
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.name}>City - </Text>
                            <TextInput defaultValue={city} ref={cityRef} onChangeText={(city) => setcity(city)} />
                        </View>
                        <TouchableOpacity onPress={() => cityRef.current.focus()}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </Card>
                <Card>
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.name}>Pincode - </Text>
                            <TextInput keyboardType='decimal-pad' defaultValue={pincode} ref={pincodeRef} onChangeText={(pincode) => setpincode(pincode)} />
                        </View>
                        <TouchableOpacity onPress={() => pincodeRef.current.focus()}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </Card>
                <Card>
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.name}>State - </Text>
                            <TextInput defaultValue={state} ref={stateRef} onChangeText={(state) => setstate(state)} />
                        </View>
                        <TouchableOpacity onPress={() => stateRef.current.focus()}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>

                    </View>
                </Card>
            </View>
            <View style={{ padding: 15 }}>
                <Button style={styles.btn} onPress={() => handleApplyChanges()} >Apply Changes</Button>
            </View>
            <TouchableOpacity style={{ padding: 15 }}>
                <Button onPress={() => handleReset()} style={styles.btn}>Reset Changes</Button>
            </TouchableOpacity>


        </View>
    )
}

export default Address

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