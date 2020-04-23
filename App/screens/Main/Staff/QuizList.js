///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity, Platform, Picker } from 'react-native';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AsyncStorage } from 'react-native';


export default class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            Quizzes: [],
            Quiz: "Computer1"
        };
    }

    updateSelectQuiz = (Quiz) => {//Method to update quiz state
        this.setState({ Quiz: Quiz })
    }

    onSelectpress = async () => {//Method to disply selected quiz questions
        let that = this;//set that to this
        var arr = []; //create array
        var Quiz = "" + that.state.Quiz//set quiz to state quiz
        try {

            const documentSnapshot = firestore().collection("Questions");//reference to questions collection

            documentSnapshot.doc(Quiz).get().then(function (doc) {//get quiz then
                if (doc.exists) {//if document exists
                    if (Quiz === "Mobile") {//if its first quiz
                        var array = doc.data().Mobile//set array equal to quiz questions
                        that.updateQuiz(array);//call update quiz with param array
                    }
                    if (Quiz === "Computer1") {//if its second quiz
                        var array = doc.data().Computer1 //set array equal to quiz questions
                        that.updateQuiz(array);//call updateQuiz with param array
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
        } catch (error) {
            alert("error");//alert user to error
        }
    }

    onLoadQuestions = () => {//Method tocall onSelectPress
        this.onSelectpress();
    }

    updateQuiz = (Quiz) => {//Method to update state quizzes
        this.setState({ Quizzes: Quiz })
    }

    // Occurs when signout is pressed...
    onBackToStaffPress = () => {//Method to Navigate to Staff Page
        return (this.props.navigation.navigate("Staff"))
    }


    render() {
        const state = this.state; //set state to this.state
        var arr = [];//create array
        Object.keys(state.Quizzes).forEach(function (key) {//for each object
            arr.push(state.Quizzes[key]);//push current question data to array
        })
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.selectBtn}>
                        <Picker style={styles.Select} selectedValue={this.state.Quiz} onValueChange={this.updateSelectQuiz}>
                            <Picker.Item label="Mobile Quiz 1" value="Computer1" />
                            <Picker.Item label="Mobile Quiz 2" value="Mobile" />
                        </Picker>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onLoadQuestions} >
                        <Text style={styles.loginText}>Show questions</Text>
                    </TouchableOpacity>
                    {
                        //map through questions
                        arr.map((prop, key) => {
                            return (
                                <View style={styles.container3}>
                                    <Text style={styles.loginHead}>{prop.question}</Text>
                                    {
                                        //map through answers
                                        prop.answers.map((prop2, key2) => {
                                            if (prop2.correct === true) {//if its correct answer
                                                return (
                                                    <View style={styles.container3}>
                                                        <Text style={styles.loginText}>{prop2.text}: Correct Answer</Text>
                                                    </View>
                                                )
                                            } else {//if other than correct answer
                                                return (
                                                    <View style={styles.container3}>
                                                        <Text style={styles.loginText}>{prop2.text}</Text>
                                                    </View>)
                                            }
                                        })
                                    }
                                    <Text style={styles.loginHead}></Text>
                                </View>
                            )
                        })}

                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStaffPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                    {
                    }

                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
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
    }, container3: {
        //flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    }, Select: {
        height: 50,
        width: "100%",
        color: "white",
        fontSize: 14,
        alignItems: "center",
        justifyContent: "center",
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
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
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
        marginTop: 20,
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
    },
    loginHead: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    selectBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        display: "flex"
    },
});
