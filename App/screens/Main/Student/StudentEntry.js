///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity } from 'react-native';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class StudentEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }





    // Occurs when signout is pressed...
    onSignoutPress = () => {//Method to Sign Out and go back to login page
        auth().signOut();
        return (this.props.navigation.popToTop())
    }

    onQuizPress = () => {//Method to Navigate to Quiz Page
        return this.props.navigation.navigate("Quiz");
    }

    onEditPress = () => {//Method to Navigate to EditDetails Page
        return this.props.navigation.navigate("EditDetails");
    }

    gotoResults = () => {//Method to Navigate to Result Page
        return this.props.navigation.navigate("StudentResults");
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state; //assign state reference to variable state
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2}>
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onEditPress}>
                        <Text style={styles.loginText}>Edit Detials</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onQuizPress}>
                        <Text style={styles.loginText}>Open Quiz Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.gotoResults}>
                        <Text style={styles.loginText}>Show Results</Text>
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
        paddingBottom: 50
    },
    cell: {
        //backgroundColor: 'white',
        borderWidth: 1,
        flex: 1,
        //alignSelf: 'auto',
        paddingRight: 0,
        //height: 100
    },
    tableHeader: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#fb5b5a",
    },
    container3: { backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
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
        color: "white",
        fontSize: 14
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
