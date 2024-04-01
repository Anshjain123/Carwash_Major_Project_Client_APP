import { StyleSheet, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import { rgbToHex } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';


// this file is no longer used 

const CheckoutPage = ({ route, navigation }) => {


    const { car, token } = route.params;

    const handlePay = async () => {
        console.log("paying")
        try {
            let res = await fetch("http://192.168.1.23:8080/client/createpaymentintent", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ amount: 1 })

            })
            // console.log(res); 
            


        } catch (error) {
            console.log("error in checkout");
            console.log(error);
        }
    }

    return (
        <View>
            <View id="payment-form">
                <View id="payment-element">
                </View>
                <Button onPress={handlePay}>
                    <View class="spinner hidden" id="spinner"></View>
                    <Text o >Pay now</Text>
                </Button>
                <View id="payment-message" class="hidden"></View>
            </View>
            <Text>Checkout</Text>
        </View>
    )
}

export default CheckoutPage

const styles = StyleSheet.create({
    payment_form: {
        width: "30vw",
        minWidth: '500px',
        alignSelf: 'center',
        borderRadius: '7px',
        padding: '40px'
    },
    hidden: {
        display: 'none',
    },

    payment_message: {
        // color: rgbToHex(105, 115, 134),
        fontSize: "16px",
        lineHeight: "20px",
        paddingTop: '12px',
        textAlign: 'center',
    },
    payment_element: {
        marginBottom: '24px'
    },


})