import React, { useState, useEffect, useReducer } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { launchCameraAsync } from 'expo-image-picker';
import { Button, Card } from '@rneui/base';

const ViewMedia = ({ route, navigation }) => {


    const [allUrls, setallUrls] = useState([])

    const { car, token, date } = route.params;
    const host = "172.31.65.218";

    const getImages = async () => {



        let response = await fetch(`http://${host}:8080/client/getUrlsByDateAndCarNumber`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ carNumber: car.carNumber, date: date })
        })

        try {
            let res = await response.json();
            console.log("printing res",res);
            setallUrls(res);
            // toast.success("fetched images succefully!");
        } catch (error) {
            console.log(error);
            // toast.error("cannot fetched images! may be images are not uploaded for this day");
        }
    }

    useEffect(() => {




        getImages();

    }, [])



    // console.log(image1);
    console.log(allUrls.length);
    return (

        <ScrollView>



            <View style={imageUploaderStyles.container}>

                {allUrls.length > 0 && allUrls.map((url, i) => {
                    return <Card>

                        <View key={i} >
                            <Image
                                style={imageUploaderStyles.image}
                                source={{ uri: url }}
                            />
                        </View>
                    </Card>

                })}
                {allUrls.length == 0 && <Card>

                    <View>
                        <Text>No images uploaded for selected date</Text>
                    </View>
                </Card>}

            </View>
            {/* {url != null && <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />} */}
        </ScrollView>

    )
}





const imageUploaderStyles = StyleSheet.create({

    image: {
        width: "100%", // Adjust as needed
        height: 200, // Adjust as needed
        // resizeMode: 'cover', // Adjust as needed
    },
})



export default ViewMedia












