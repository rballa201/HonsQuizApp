///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default class SignUp extends React.Component {
    state = {
        name: "",
        SID: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }




    onSignupPress = () => { //Create Account Method
        if (this.state.password !== this.state.passwordConfirm) {//If passwords dont match alert user
            Alert.alert("Passwords do not match");
            return;
        }

        auth().createUserWithEmailAndPassword(this.state.email, this.state.password) //Create User Account using firebase auth
            .then(() => {
                try {
                    this.createUser(); //call create user method
                } catch (error) {
                    Alert.alert("Inavlid Login Details"); //alert user that login is inavlid
                }

            }, (error) => { Alert.alert(error.message); });

    }

    createUser = () => {//Add user details to firestore method
        auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                var userId = auth().currentUser.uid; //set variable to current user id
                const ref = firestore().collection('Users').doc(userId)//reference to User Info
                const user = { //Set State
                    email: "" + [this.state.email],
                    Name: "" + [this.state.name],
                    SID: "" + [this.state.SID]
                }
                ref.set(user, { merge: true }).then(() => {//Update User Info then
                    this.setState({//Empty State
                        name: "",
                        SID: "",
                        email: "",
                        password: "",
                        passwordConfirm: ""
                    })
                    auth().signOut();//Sign Out of firebase
                })
                Alert.alert('Sign Up Complete!\nPlease Login')//Alert user that sign up finished
                this.props.navigation.navigate("Login"); //Navigate to login page
            }, (error) => { Alert.alert(error.message); });
    }

    onBackToLoginPress = () => {//Navigate to Login after emptying State
        this.setState({
            name: "",
            SID: "",
            email: "",
            password: "",
            passwordConfirm: ""
        })
        this.props.navigation.navigate("Login");
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
                    <View style={styles.inputView} >
                        <TextInput //Student Email Input
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
                        <TextInput //Student Password Input
                            style={styles.inputText}
                            value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            placeholder="Password"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput //Student Password Confirm Input
                            style={styles.inputText}
                            value={this.state.passwordConfirm}
                            onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
                            placeholder="Password Confirmation"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity style={styles.inputButton} onPress={() => {
                        if (this.state.name === "") { //If Student Name Input is empty alert user
                            Alert.alert("Enter your name")
                        } else if (this.state.SID === "") {//If Student ID Input is empty alert user
                            Alert.alert("Enter Student ID")
                        } else if (this.state.email === "") {//If Student Email Input is empty alert user
                            Alert.alert("Enter Email Address")
                        } else if (this.state.password === "") {//If Student Password Input is empty alert user
                            Alert.alert("Enter your password")
                        } else if (this.state.passwordConfirm === "") {//If Student pasword confimation Input is empty alert user
                            Alert.alert("Enter your password confrmation")
                        }
                        else { this.onSignupPress() } //Call onSignupPress Method
                    }}>
                        <Text style={styles.loginText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToLoginPress}>
                        <Text style={styles.loginText}>Cancel Sign Up...</Text>
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
