///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';


export default class FeedbackScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: "",
            data: {}
        };
    }

    onBackToStudentPress = () => {//Method to Navigate back to Student Page
        this.props.navigation.navigate("Student");

    }

    componentDidMount = () => {//Call onUpdatePress when this page is loaded
        this.onUpdatePress();
    }

    onUpdatePress = async () => {//MEthod to obtain and display feedback
        const value = await AsyncStorage.getItem('FeedbackID'); //get feedbackid from AsyncStorage
        var userId = auth().currentUser.uid;//set userid to current user id
        const ref = firestore().collection('Users').doc(userId).collection("Quizzes");//refrence to user quiz results
        let that = this;// set that equal to this
        let state = this.state; //set state equal to this.state

        ref.doc(value).get().then(function (doc) {//get exact quiz result document
            if (doc.exists) {//if document exists
                var feedback = doc.data().feedback;//set variable equal to feedback
                var Data = doc.data(); //set variable eual to all data on document
                that.setState({//Set State
                    feedback: feedback,
                    data: Data
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);//log error
        });
    }


    render() {
        const state = this.state; //set state equal to this.state
        var arr = [];//create empty array
        var arr2 = [];//create second empty array
        var data = state.data; //set data equal to document data

        Object.getOwnPropertyNames(data).sort().forEach(//sort quiz data to order it
            function (val, idx, array) {
                if (data[val] === true) {//if current question was correct then
                    arr.push("Correct"); //push correct to arr
                }
                else if (data[val] === false) {//if current question is false then
                    arr.push("Incorrect");//push incorrect to arr

                } else {//if neither push data at position to arr
                    arr.push(data[val]);
                }
                arr2.push(val)//push name to aar2
            });

        arr.pop();//remove last array element
        arr2.pop();//remove last element in array

        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    {
                        //map through array
                        arr2.map((prop, key) => {
                            var string = "" + arr[key]//set string eqaul to value in current arr position
                            return (
                                <View style={styles.container3}>
                                    <Text style={styles.loginHead}>{arr2[key]}</Text>
                                    <View style={styles.inputView} >
                                        <TextInput //Used For Displaying Data
                                            style={styles.inputText}
                                            value={string}
                                            editable={false}
                                            multiline={true}
                                        />
                                    </View>
                                    <Text style={styles.loginText}></Text>
                                </View>
                            )
                        })
                    }
                    <Text style={styles.loginHead}>Feedback</Text>
                    <View style={styles.inputView} >
                        <TextInput //Used for displaying feedback
                            style={styles.inputText}
                            value={this.state.feedback}
                            multiline={true}
                            numberOfLines={10}
                            editable={false}
                            placeholder="Feedback"
                        />
                    </View>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStudentPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    loginHead: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        paddingVertical: 40,
        paddingHorizontal: 5,
    },
    container2: {
        //flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    container3: {
        //flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        //height: "25%",
        marginBottom: 20,
        //justifyContent: "center",
        padding: 5
    },
    inputText: {
        // height: 50,
        textAlignVertical: 'top',
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    inputButton: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signUpBtn: {
        width: "80%",
        backgroundColor: "blue",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10,
        display: "flex"
    },
    disappear: {
        display: "none"
    },
    Selected: {
        width: "40%",
        backgroundColor: "green",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 0,
        marginLeft: "25%",
        marginRight: "25%",
        flexDirection: 'row'
    },
    notSelected: {
        width: "40%",
        backgroundColor: "#003f5c",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 0,
        marginLeft: "25%",
        marginRight: "25%",
        flexDirection: 'row'
    },
    loginText: {
        color: "white"
    }
});