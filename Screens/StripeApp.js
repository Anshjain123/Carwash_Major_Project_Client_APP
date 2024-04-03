import { StyleSheet, View, TextInput, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CardField, useConfirmPayment, useStripe } from "@stripe/stripe-react-native"
import Toast from 'react-native-toast-message';
import { Text, Card, Icon } from '@rneui/themed';
const StripeApp = ({ route, navigation }) => {

    const [email, setemail] = useState("");
    const [cardDetails, setcardDetails] = useState("")
    const { confirmPayment, loading } = useConfirmPayment();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [Loading, setLoading] = useState(false)
    const { car, token, reload } = route.params;



    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Payment',
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])


    const showToastSuccess = (msg) => {
        Toast.show({
            type: 'success',
            text1: msg
        });
    }

    const showToastError = (msg) => {
        Toast.show({
            type: 'error',
            text1: msg
        });
    }

    const fetchPaymentIntentClientSecret = async () => {
        console.log("paying")
        try {

            let amount;
            if (car.plan === "plan1") {
                amount = 250;
            } else if (car.plan === "plan2") {
                amount = 500;
            } else {
                amount = 700;
            }
            let res = await fetch("http://172.31.65.95:8080/client/createpaymentintent", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ amount: amount, carNumber: car.carNumber })

            })
            // console.log(res); 

            try {
                const { clientSecret, id } = await res.json();
                // console.log("clientSecret -> ", clientSecret);

                return { clientSecret, id };
            } catch (error) {
                console.log(error, "error in converting res.json");
            }



        } catch (error) {
            console.log("error in checkout");
            console.log(error);
        }
    }

    const handlePayPress = async () => {
        if (cardDetails == "" || email == "") {
            showToastError("Please select date");
            return;
        }

        const billingDetails = {
            email: email
        }

        try {
            // console.log("yes");
            const { clientSecret, id } = await fetchPaymentIntentClientSecret();
            // console.log("printing client secret in handlepaypress ", clientSecret)


            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
                paymentMethodData: {
                    billingDetails: billingDetails,
                }

            })


            console.log(paymentIntent);
            if (error) {
                alert(`payment confirmation error ${error.message}`)
            } else if (paymentIntent) {
                showToastSuccess("Payment is successful!");

                let res = await fetch("http://172.31.65.95:8080/client/sendPaymentSuccessNotification", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ carNumber: car.carNumber, id: id })


                })

                if (res.ok) {
                    navigation.navigate("home");

                }


                // try {
                //     let response = await res.json();
                //     console.log(response);     
                // } catch (error) {
                //     console.log(error);
                // }

            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View style={styles.container} >

            <Toast style={{ zIndex: 1 }} position='top' />
            <Card style={styles.mainCard} >
                <View style={styles.cardView} >


                    <Text style={styles.text} >Amount</Text>
                    <TextInput

                        autoCapitalize='none'
                        placeholder='Amount'
                        keyboardType="numeric"
                        value={car.plan == "plan1" ? "250" : (car.plan == "plan2" ? "500" : "700")}
                        // onChange={(value) => setemail(value.nativeEvent.text)}
                        style={styles.input}
                        editable={false}

                    />

                    <Text style={styles.text}>Email address</Text>
                    <TextInput

                        autoCapitalize='none'
                        placeholder='E-mail'
                        keyboardType='email-address'
                        onChange={(value) => setemail(value.nativeEvent.text)}
                        style={styles.input}
                    />
                    <View style={styles.carviewdetails} >

                        <Text style={styles.text}>Enter your card details</Text>
                        <CardField

                            postalCodeEnabled={true}
                            placeholder={{
                                number: "4242 4242 4242 4242"
                            }}
                            cardStyle={styles.card}
                            style={styles.cardContainer}
                            onCardChange={cardDetails => {
                                setcardDetails(cardDetails)
                            }}
                        />
                    </View>


                    <Button onPress={handlePayPress} title='Pay' />
                </View>
            </Card>


        </View>
    )
}

export default StripeApp

const styles = StyleSheet.create({
    carviewdetails: {
        width: "100%",
        height: 50,
        marginVertical: 15,
        marginBottom: 30
    },
    text: {
        color: 'gray',
        padding: 2
    },
    mainCard: {
        width: '100%',
        zIndex:-1

        // flexDirection:'row'
    },
    cardView: {
        width: "100%"
        // flex:1, 
        // flexDirection:'row'
    },
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    input: {
        backgroundColor: "#efefefef",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
        width: "80%"
        // zIndex: -1
    },
    card: {
        backgroundColor: "#efefefef",
    },
    cardContainer: {
        width: "100%",
        height: 50,
        // marginVertical: 30
    }
})