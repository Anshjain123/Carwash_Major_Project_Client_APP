import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import { Text, Card, Button, Icon } from '@rneui/themed';
import DatePicker from "react-native-modern-datepicker";
// import Toast from 'react-native-toast-message';

const ClientCarDetails = ({ car, navigation, mode, token, showToastError}) => {


    // const [token, settoken] = useState(null);
    const [date, setdate] = useState(null);
    const [open, setopen] = useState(false);
    const [reload, setreload] = useState(0);

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

    // const showToastSuccess = () => {
    //     Toast.show({
    //         type: 'success',
    //         text1: 'all iamges uploaded successfully'
    //     });
    // }

    // const showToastError = () => {
    //     Toast.show({
    //         type: 'error',
    //         text1: 'Please select date'
    //     });
    // }


    const handleCheckoutPage = (car) => {
        navigation.navigate("stripe", { car: car, token: token, reload: reload })
    }


    return (
        <Card key={car.carNumber}>
            {/* <Toast style={{ zIndex: 1 }} position='top' /> */}
            <View style={styles.user} >
                {/* <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={{ uri: u.avatar }}
                                    /> */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', borderLeftColor: colorPlans[car.plan], borderLeftWidth: 5 }} >
                    <View style={{ display: 'flex' }}>

                        <Text style={styles.name}>CarModel - {car.carModel}</Text>
                        <Text style={styles.name}>CaNumber - {car.carNumber}</Text>
                        <Text style={styles.name}>Description - {car.description}</Text>
                        <Text style={styles.name}>Plan - {car.plan}</Text>
                        <Text style={styles.name}>Validity - {moment(car.planValidity).utc().format("DD-MM-YYYY")}</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'space-around' }} >
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

                {/* <View>
                                        <Button onPress={() => handleAddMedia(car)} >Add media</Button>
                                </View> */}

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