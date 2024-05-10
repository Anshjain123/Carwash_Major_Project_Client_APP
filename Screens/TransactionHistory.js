import { StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import storage from '../storage';
import moment from 'moment'
import { Text, Card, Button, Icon } from '@rneui/themed';

const TransactionHistory = ({ navigation, route }) => {

    const { car } = route.params;

    const [transactionHistory, settransactionHistory] = useState([]);

    const host = "172.31.66.127";
    const getTransactionHistory = async () => {
        let res = await storage.load({ key: "ClientloginState" })
        let username = res.username;
        let token = res.token;

        let body = {
            carNumber: car.carNumber,
            username: username
        }

        try {
            let res = await fetch(`http://${host}:8080/client/transactionHistory`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)

            })

            try {
                let response = await res.json();
                console.log(response)
                // setallAssignedCars(response);
                settransactionHistory(response);

            } catch (error) {
                console.log("problem converting res to res.json in getData in transaction history");
            }

        } catch (error) {
            console.log("error in home in retrieving all transaction history cars!");
            console.log(error);
        }

    }


    useEffect(() => {
        getTransactionHistory();
    }, [])

    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Home",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])

    let colorPlans = {
        "plan2": "#3498db",
        "plan1": "#e74c3c",
        "plan3": "#ffd700"
    }

    let statusColors = {
        "success":"green",
        "pending":"yellow"
    }

    return (
        <View>
            {transactionHistory.map((transaction) => {
                return <Card key={transaction.id}>
                    {/* <Toast style={{ zIndex: 1 }} position='top' /> */}
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', borderLeftColor: colorPlans[car.plan], borderLeftWidth: 5 }} >
                            <View style={{ display: 'flex', flex: 0.9 }}>

                                <Text style={styles.name}>CaNumber - {car.carNumber}</Text>
                                <Text style={styles.name}>Amount - {transaction.amount}</Text>
                                <Text style={styles.name}>Date of transaction - {moment(transaction.date).utc().format("DD-MM-YYYY")}</Text>
                                <Text style={styles.name}>Status - <Text style = {{color:statusColors[transaction.status], fontWeight:'900'}} >{transaction.status}</Text></Text>
                            </View>

                        </View>


                    </View>
                </Card>
            })}
            
            {transactionHistory.length == 0 && <Card>
                    {/* <Toast style={{ zIndex: 1 }} position='top' /> */}
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', borderLeftWidth: 5 }} >
                            <View style={{ display: 'flex', flex: 0.9 }}>

                                <Text style={styles.name}>No transaction done for this car</Text>
                               
                            </View>

                        </View>


                    </View>
                </Card>}
        </View>
    )
}

export default TransactionHistory

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
        fontSize: 16,
        marginTop: 5,
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

    }
})