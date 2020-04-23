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


export default class EditDetails extends React.Component {
    state = {
        name: "",
        SID: ""
    }

    componentDidMount = () => {
        let that = this; //set that to equal this
        var userId = auth().currentUser.uid;// set user id to current user id
        const documentSnapshot = firestore().collection("Users"); //reference to user collection


        documentSnapshot.doc(userId).get().then(function (doc) {//get user docuent
            if (doc.exists) {//if document exists
                var name = doc.data().Name //set name to user name
                var sid = doc.data().SID //set sid tp user sid
                that.setState({//set state
                    name: name,
                    SID: sid
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }



    editUser = () => {//Method for updating user details
        var userId = auth().currentUser.uid;//set user id to current user id

        const ref = firestore().collection('Users').doc(userId);//reference to user ocument
        ref.update({//Update user details in document
            Name: "" + [this.state.name],
            SID: "" + [this.state.SID]
        })
        this.props.navigation.navigate("Student");//Navigateback to student
    }

    onBackToStudentPress = () => {//Method to Navigate to Student Page
        this.props.navigation.navigate("Student");
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <View style={styles.inputView} >
                        <TextInput //Student Name Input
                            style={styles.inputText}
                            value={this.state.name}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                            placeholder="Name"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput //Student ID Input
                            style={styles.inputText}
                            value={this.state.SID}
                            onChangeText={(text) => { this.setState({ SID: text }) }}
                            placeholder="Student ID"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity style={styles.inputButton} onPress={this.editUser}>
                        <Text style={styles.loginText}>Confirm Details?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStudentPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingBottom: 100
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
