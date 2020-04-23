///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Firebase from 'firebase';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ApiKeys from '../../constants/ApiKeys';
import { AsyncStorage } from 'react-native';


export default class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        //if (!Firebase.apps.length) { Firebase.initializeApp(ApiKeys.FirebaseConfig); }
        //firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }


    showAdminButton = async () => {
        let that = this; // assign this reference to variable that.

        var userId = auth().currentUser.uid;
        const documentSnapshot1 = firestore().collection("Questions").doc("Computer1").get();//Cache 1st Quz
        const documentSnapshot2 = firestore().collection("Questions").doc("Mobile").get();//Cache 2nd Quiz
        const documentSnapshot = firestore().collection("Admin");//Cache Admin Info

        documentSnapshot.doc(userId).get().then(function (doc) { //obtain docment then
            if (doc.exists) {//if document in firestore exists
                var AdminID = doc.data().UID //set variable adminid from id in firestore
                var isAdmin = doc.data().Admin // set variable isAdmin to the value from firestore 
                if (isAdmin === true && AdminID === userId) { //If the User has the same UID as the admin and is an admin
                    const documentSnapshot3 = firestore().collection('Users').get(); //GEt collection of users
                    const quizzes = firestore().collectionGroup("Quizzes").get(); //Get All Users Quizzes
                    that.setState({ //Empty State
                        email: "",
                        password: "",
                    })
                    return that.props.navigation.navigate("Staff"); //Navigate to Staff Page
                }
                else {
                    const snapshot1 = firestore().collection('Users').doc(userId).collection("Quizzes").get(); //Get/Cache the Students Quiz results
                    const snapshot2 = firestore().collection('Users').doc(userId).get(); //Get User Information
                    that.setState({ //Empty State
                        email: "",
                        password: "",
                    })
                    return that.props.navigation.navigate("Student"); //Navigate to Student Page 
                }
            } else {
                const snapshot1 = firestore().collection('Users').doc(userId).collection("Quizzes").get(); //Get/Cache the Students Quiz results
                const snapshot2 = firestore().collection('Users').doc(userId).get(); //Get User Information
                that.setState({ //Empty State
                    email: "",
                    password: "",
                })
                return that.props.navigation.navigate("Student"); //Navigate to Student Page 
            }
        }).catch(function (error) {
        });
    }

    onLoginPress = () => { //Sign in using Login function from firebase auth
        auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.showAdminButton(); //call showAdminButton method
            }, (error) => { alert(error.message); });
    }

    onCreateAccountPress = () => { //Empty State then Navigate to Sign Up Page
        this.setState({
            email: "",
            password: "",
        })
        this.props.navigation.navigate("SignUp")
    }
    onCreateStaffAccountPress = () => { //Empty State then Navigate to Staff Sign Up Page
        this.setState({
            email: "",
            password: "",
        })
        this.props.navigation.navigate("StaffSignUp")
    }

    onForgotPasswordPress = () => { //Empty State then Navigate to Forgot Password Page
        this.setState({
            email: "",
            password: "",
        })
        this.props.navigation.navigate("ForgotPassword")
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <View style={styles.inputView} >
                        <TextInput //Email Input
                            style={styles.inputText}
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}//Password Input
                            value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            placeholder="Password"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity onPress={this.onForgotPasswordPress} >
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={() => {
                        if (this.state.email === "") {//If email input is empty alert user 
                            Alert.alert("Enter Email Address")
                        } else if (this.state.password === "") {//if password input is empty alert user
                            Alert.alert("Enter a password")
                        } else { this.onLoginPress() } //else call onLoginPress method
                    }}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onCreateAccountPress}>
                        <Text style={styles.loginText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onCreateStaffAccountPress}>
                        <Text style={styles.loginText}>Staff Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    };
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