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
import { AsyncStorage } from 'react-native';

export default class StudentResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Quizzes: {},
            QuizzesText: [],
            QuizID: [],
        };
    }

    onFeedbackPress = async (data) => {//Method for navigating to feedback page
        try {
            await AsyncStorage.setItem('FeedbackID', data);//set feedbackid in AsyncStorage
        } catch (error) {
            Alert.alert("Error");//Alert user to error
        }
        this.goToFeedback();//call goToFeednack method
    }

    goToFeedback = () => {//Method to Navigate to Feedback Page
        return this.props.navigation.navigate("ViewFeedback");
    }

    onQuizPress = () => {//Method to Navigate to Quiz Page
        return this.props.navigation.navigate("Quiz");
    }

    onBackToStudentPress = () => {//Method to Navigate to Student Page
        return this.props.navigation.navigate("Student");
    }

    componentDidMount = () => {
        var userId = auth().currentUser.uid;//set user id to current user id
        const that = this;//set that to this
        const snapshot = firestore().collection('Users').doc(userId).collection("Quizzes").get();//ref to user quiz collection
        const collection = {};//empty json object
        const collection2 = [];//empty array

        snapshot.then(function (doc) {//get collection then
            doc.forEach(function (key, index) {//for each dcument
                collection[index] = key.data(); //set indexed object to curent document data
                collection2[index] = key.id; //set indexed array to document id
            });

            that.setState({//Set State
                Quizzes: collection,
                QuizID: collection2
            })
        })
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state;//set state to equal this.state 
        var arr = [];//create arr
        Object.keys(state.Quizzes).forEach(function (key) {//for each object
            arr.push(state.Quizzes[key]);//push data from object to array
        });

        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2}>
                    <Text style={styles.logo}>Quiz App</Text>
                    <View style={styles.table}>
                        <View style={{ flexDirection: 'row' }}>{/* Create Table Heaings */}
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Quiz ID</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Mark</Text>
                            </View>
                            {}
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Feedback</Text>
                            </View>
                        </View>
                        {
                            //map through array containing results
                            arr.map((prop, key) => {
                                return (
                                    <View key={key} style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <View style={styles.cell}>
                                            {/* Set quiz id as text, mark as second cell and btton as last cell */}
                                            <Text key={key} style={styles.inputText}>{prop["Quiz Name"]} {"\n"}ID:{key + 1}</Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <Text key={key} style={styles.inputText}>{prop.Mark}</Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <TouchableOpacity style={styles.tableButton} onPress={() => that.onFeedbackPress(state.QuizID[key])}>
                                                <Text key={key} style={styles.loginText}>View?</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                                // })
                            })
                        }
                    </View>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onQuizPress}>
                        <Text style={styles.loginText}>Open Quiz Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStudentPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    tableButton: {
        width: "90%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: "80%",
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
        paddingBottom: 5,
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
        fontSize: 13,
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
        marginBottom: 40
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
