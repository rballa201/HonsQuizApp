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

    gotoResults = () => {//Method to Navigate to Staff Result Page
        return this.props.navigation.navigate("StaffResult");
    }

    componentDidMount = () => {//Method to call on view method
        this.onView();//call onView method
    }

    onView = async () => {//Method to display student result for staff
        const value = await AsyncStorage.getItem('FeedbackID');//get feedbackid from AsyncStorage
        const student = await AsyncStorage.getItem('StudentID');//get studentid from AsyncStorage
        const ref = firestore().collection('Users').doc(student).collection("Quizzes");//refrence to student quiz results
        let that = this;// set that equal to this

        ref.doc(value).get().then(function (doc) {//get exact quiz result document
            if (doc.exists) {//if document exists
                var feedback = doc.data().feedback;//set variable equal to feedback
                var Data = doc.data();//set variable eual to all data on document
                that.setState({//Set State
                    feedback: feedback,
                    data: Data
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    onUpdatePress = async () => {//Method to update feedback
        const value = await AsyncStorage.getItem('FeedbackID');//get feedbackid from AsyncStorage
        const student = await AsyncStorage.getItem('StudentID');//get student id from AsyncStorage
        const that = this;// set that equal to this
        const ref = firestore().collection('Users').doc(student).collection("Quizzes").doc(value);//refrence to exact student quiz results
        ref.update({//update student feedback
            feedback: "" + [this.state.feedback]
        }).then(function (doc) {
            that.setState({//Empty State
                feedback: "",
            })
        })

        that.props.navigation.navigate("StaffResult");//navigate to staff result

    }

    render() {
        const state = this.state;//set state to this.state
        var arr = [];//create array
        var arr2 = [];//create second array
        var data = state.data;//set data to equal state data

        Object.getOwnPropertyNames(data).sort().forEach(//for each obect tht has a name in data
            function (val, idx, array) {
                if (data[val] === true) {//if student answer  wascorrect
                    arr.push("Correct");//push correct to arr
                }
                else if (data[val] === false) {//if student answer was incorrect
                    arr.push("Incorrect");//push incorrect to arr

                } else {//if neither push data at position to arr
                    arr.push(data[val]);
                }
                arr2.push(val) //push object name to arr2
            });

        arr.pop();//remove feedback from array
        arr2.pop();//remove feedback from array

        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    {
                        //Map through object/field names
                        arr2.map((prop, key) => {
                            var string = "" + arr[key]//set string to name
                            return (
                                <View style={styles.container3}>
                                    <Text style={styles.loginHead}>{prop}</Text>
                                    <View style={styles.inputView} >
                                        <TextInput //Used to View data
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
                    <View style={styles.inputView}>
                        <TextInput //Usd to see and edit feedback
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ feedback: text }) }}
                            placeholder="Feedback"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onUpdatePress}>
                        <Text style={styles.loginText}>Update Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.gotoResults}>
                        <Text style={styles.loginText}>Back to Results...</Text>
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
        paddingHorizontal: 5
        //alignItems: 'center',
        //justifyContent: 'center',
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