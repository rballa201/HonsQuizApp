///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity, Picker } from 'react-native';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AsyncStorage } from 'react-native';

export default class StudentEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    // Occurs when signout is pressed...
    onSignoutPress = () => {//Method to sign out then Navigate to login Page
        auth().signOut();
        return (this.props.navigation.popToTop())
    }

    onQuizPress = () => {//Method to Navigate to Quiz List Page
        return this.props.navigation.navigate("QuizList");
    }

    onQuestionPress = () => {//Method to Navigate to Add Question Page
        return this.props.navigation.navigate("AddQuestions");
    }

    gotoResults = () => {//Method to Navigate to staff Page
        return this.props.navigation.navigate("StaffResult");
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onQuizPress}>
                        <Text style={styles.loginText}>Open Quiz List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onQuestionPress}>
                        <Text style={styles.loginText}>Open Question Adder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.gotoResults}>
                        <Text style={styles.loginText}>Show Students Results</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onSignoutPress}>
                        <Text style={styles.loginText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    Select: {
        height: 50,
        width: "100%",
        color: "white",
        fontSize: 14,
    },
    tableButton: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10,
        marginHorizontal: 5
    },
    table: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white',
        alignSelf: 'auto',
        paddingBottom: 50,
        paddingTop: 20
    },
    cell: {
        //backgroundColor: 'white',
        borderWidth: 1,
        flex: 1,
        alignSelf: 'auto',
        paddingRight: 0,
        height: 50
    },
    tableHeader: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fb5b5a",
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
        //paddingRight: 10,
        color: "white",
        fontSize: 14,
        //flex: 1,
        //flexWrap: 'wrap'
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
