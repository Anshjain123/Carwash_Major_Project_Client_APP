import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import { Text, Card, Button, Icon } from '@rneui/themed';
import DatePicker from "react-native-modern-datepicker";
import { Entypo } from '@expo/vector-icons';
// import { Rating } from '@rneui/themed';
import { Rating, AirbnbRating } from 'react-native-ratings';
import storage from '../storage';
import Toast from 'react-native-toast-message';

const ClientCarDetails = ({ car, navigation, mode, token }) => {


    // const [token, settoken] = useState(null);
    const [date, setdate] = useState(null);
    const [open, setopen] = useState(false);
    const [reload, setreload] = useState(0);
    const [ratingModal, setratingModal] = useState(false);
    const [ratings, setratings] = useState(0);
    const handleViewMedia = async (car) => {
        console.log("trying to get media");
        if (date == null) {
            showToastError();
            return;
        }

        // let formattedDate = moment(new Date(date)).utc().format("DD-MM-YYYY"); 
        // setdate(formattedDate); 
        // console.log("date-> ", formattedDate);



        navigation.navigate("viewmedia", { car: car, token: token, date: date })

        let urls = [];


        console.log("printing all urls");
        console.log(urls);

    }


    let colorPlans = {
        "plan2": "#3498db",
        "plan1": "#e74c3c",
        "plan3": "#ffd700"
    }


    const handleSelectDate = () => {

        setopen(!open);
        //     <DateTimePicker
        //     mode="single"
        //     date={date}
        //     onChange={(params) => setdate(params.date)}
        //   />
    }

    const handleChangeDate = (date) => {
        setdate(date);
    }

    const showToastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'Ratings added Successfully'
        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Ratings can not be added right now please try again later'
        });
    }


    const handleCheckoutPage = (car) => {
        navigation.navigate("stripe", { car: car, token: token, reload: reload })
    }

    const handleSeeTransactionHistory = () => {
        navigation.navigate("transaction", { car: car })
    }
    const ratingCompleted = (rating) => {
        console.log('Rating is: ' + rating);
    };

    const handlePress = () => {
        console.log("presses")
    }
    const handleSubmit = async () => {
        let res = await storage.load({ key: "ClientloginState" })
        let username = res.username;
        let token = res.token;

        try {
        
            let body = {
                username:username, 
                carNumber:car.carNumber, 
                rating:ratings
            }
            let res = await fetch("http://172.31.65.95:8080/client/addRatings", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)

            })

            // console.log(res);
            
            if(res.status == 200) {
                showToastSuccess();
                setratingModal(false);
            } else {
                showToastError(); 
            }

            try {
                let response = await res.text();
                console.log(response)
                // setallAssignedCars(response);

            } catch (error) {
                console.log("problem converting res to res.json in getData in transaction history");
            }

        } catch (error) {
            console.log("error in home in retrieving all transaction history cars!");
            console.log(error);
        }
    }
    return (
        <Card key={car.carNumber}>
            <Toast style={{ zIndex: 1 }} position='top' />
            <View style={[styles.user, zIndex=-1]} >
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', borderLeftColor: colorPlans[car.plan], borderLeftWidth: 5 }} >
                    <View style={{ display: 'flex', flex: 0.55 }}>

                        <Text style={styles.name}>CarModel - {car.carModel}</Text>
                        <Text style={styles.name}>CaNumber - {car.carNumber}</Text>
                        <Text style={styles.name}>Description - {car.description}</Text>
                        <Text style={styles.name}>Plan - {car.plan}</Text>
                        <Text style={styles.name}>Validity - {moment(car.planValidity).utc().format("DD-MM-YYYY")}</Text>
                        <Text style={styles.name}>carLocation - {car.carLocation}</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'space-around', flex: 0.35 }} >
                        <View style={{ display: 'flex', marginTop: 10 }}>
                            <Button onPress={() => handleViewMedia(car)} >View Media</Button>
                        </View>

                        <View style={{ display: 'flex', marginTop: 10, borderWidth: 1, padding: 10 }}>
                            <TouchableOpacity>
                                <Text onPress={() => handleSelectDate(car)} >{date == null ? "Select date" : date}</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={open}
                        >
                            <View style={styles.centeredView} >
                                <View style={styles.modalView}>

                                    <DatePicker
                                        mode={mode}
                                        selected={date}
                                        onDateChange={handleChangeDate}
                                        format="dd-mm-yyyy"

                                    />

                                    <TouchableOpacity>
                                        <Text onPress={() => handleSelectDate(car)}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                        <View style={{ display: 'flex', marginTop: 10 }}>
                            <Button onPress={() => handleCheckoutPage(car)} >Extend Plan</Button>
                        </View>

                    </View>
                </View>


            </View>
            <View style={{ display: 'flex', marginTop: 10, }}>
                <Button onPress={() => handleSeeTransactionHistory()}>See Transaction History</Button>
            </View>

            <View style={{ display: 'flex', marginTop: 10, }}>
                <Button onPress={() => setratingModal(true)}>Submit Feedback</Button>
            </View>

            <View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={ratingModal}
                    onRequestClose={() => {
                        setratingModal(!ratingModal);
                    }}


                >


                    <View style={styles.confirmCenteredView}>

                        <View style={styles.modalView}>

                            

                            <View>

                                <View style={{ marginBottom: 25,}} >
                                    <AirbnbRating
                                        count={5}
                                        onFinishRating={(rating) => setratings(rating)}
                                        reviews={["Terrible", "Bad", "OK", "Good", "Great"]}
                                        defaultRating={0}
                                        size={50}
                                    />
                                </View>
                                <View style = {{marginBottom:10}} >
                                    <Button title="Submit" onPress={() => handleSubmit()} />
                                </View>
                                <View>

                                    <Button title="Cancel" onPress={() => setratingModal(false)} />
                                </View>
                            </View>
                        </View>
                    </View>


                </Modal>


            </View>
        </Card>
    )
}

export default ClientCarDetails

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
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // width: '90%',
        padding: 25,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

    },
    confirmCenteredView: {
        flex: 1,
        // flexDirection: "row",
        // padding: 20,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-start'
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection:'row'
        // marginTop: 22,
    },
})