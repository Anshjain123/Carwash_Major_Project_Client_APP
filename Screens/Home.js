import { View, ScrollView, StyleSheet, Image, Linking, Animated, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import storage from '../storage';
import moment from 'moment';
import DatePicker from "react-native-modern-datepicker";
import Toast from 'react-native-toast-message';

const Home = ({ route, navigation }) => {

    const [allClientCars, setallClientCars] = useState([]);
    const [image, setimage] = useState(null)
    const [username, setusername] = useState("");
    const [token, settoken] = useState(null);
    const [date, setdate] = useState(null);
    const [open, setopen] = useState(false);

    const getData = async () => {
        let res = await storage.load({ key: "ClientloginState" })
        let username = res.username;
        let token = res.token;



        settoken(token);
        setusername(username);

        // console.log(token, username);

        try {
            let res = await fetch(`http://192.168.1.23:8080/client/getAllClientCars/${username}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }

            })

            try {
                let response = await res.json();
                console.log(response)
                setallClientCars(response);
                // setallAssignedCars(response);

            } catch (error) {
                console.log("problem converting res to res.json in getData in Home");
            }

        } catch (error) {
            console.log("error in home in retrieving all cleaners assigned cars!");
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const handleAddMedia = (car) => {
        console.log("Adding car media to user")
    }

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

    // #3498db -> red for plan1 
    // #e74c3c -> blue for plan2 
    // #ffd700 -> golden for plan3

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
            text1: 'all iamges uploaded successfully'
        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Please select date'
        });
    }


    // console.log(date);

    return (
        <>
            <ScrollView>
                <Toast style={{ zIndex: 1 }} position='top' />

                <View style={styles.container}>
                    {/* <Card.Title>Welcome {props.email}</Card.Title> */}
                    {allClientCars.map((car, i) => {
                        return <Card>
                            <View key={i} style={styles.user} >
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
                                                        mode='calender'
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
                                            <Button>Extend Plan</Button>
                                        </View>
                                    </View>
                                </View>

                                {/* <View>
                                        <Button onPress={() => handleAddMedia(car)} >Add media</Button>
                                </View> */}

                            </View>
                        </Card>

                    })}

                </View>
            </ScrollView>
        </>
    )
}

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
});

export default Home










// const users = [
//     {
//         name: 'brynn',
//         avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
//     },
//     {
//         name: 'thot leader',
//         avatar:
//             'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
//     },
//     {
//         name: 'jsa',
//         avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
//     },
//     {
//         name: 'talhaconcepts',
//         avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
//     },
//     {
//         name: 'andy vitale',
//         avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
//     },
//     {
//         name: 'katy friedson',
//         avatar:
//             'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
//     },
// ];