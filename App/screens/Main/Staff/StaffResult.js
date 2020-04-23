///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity, Picker } from 'react-native';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; import { AsyncStorage } from 'react-native';

export default class StudentEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Quizzes: {},
            StudentID: [],
            StudentName: [],
            StudentSID: [],
            QuizID: [],
            Student: ""
        };
    }

    updateStudent = (Student) => {//Method to update student state
        this.setState({ Student: Student })
    }

    componentDidMount = () => {
        const that = this; //set tht to this
        const snapshot = firestore().collection('Users').get();//refrence to collection of students
        const collection = []; //create array
        const collection1 = [];//create second array
        const collection2 = [];//create third array

        snapshot.then(function (doc) {//get collection then
            doc.forEach(function (key, index) {//for each docuent/user
                collection[index] = key.id; //set array at index to document id
                collection1[index] = key.data().Name; //set second array at index to student name
                collection2[index] = key.data().SID; //set third array at index to student id
            });

            that.setState({//Set State
                StudentID: collection,
                StudentName: collection1,
                StudentSID: collection2
            });
        });
    }



    onFeedbackPress = async (data, data1) => {//Method to set Feedback data in async storage
        try {
            await AsyncStorage.setItem('FeedbackID', data); //set document id in asyncstorage
            await AsyncStorage.setItem('StudentID', data1); //set studnet user id in async storage
        } catch (error) {
            Alert.alert("Error");//alert user to error
        }
        this.goToFeedback();// call go to feedback method
    }

    loadData = () => {//Method to call student data
        var userId = firebase.auth().currentUser.uid;//set user id to current userid
        const state = this.state; //set state to this.state
        var Student = state.Student; //set student to student info
        const that = this; //set that to this
        const snapshot = firestore().collection('Users').doc(Student).collection("Quizzes").get(); //user result reference
        const collection = {}; //create json object
        const collection2 = []; //create array

        snapshot.then(function (doc) {//get user quizzs collection
            doc.forEach(function (key, index) {//for each quiz results
                collection[index] = key.data(); //set object at position to results
                collection2[index] = key.id; //set array at position to docuent id
            });

            that.setState({//Set State
                Quizzes: collection,
                QuizID: collection2
            })
        })
    }

    goToFeedback = () => {//Method to Navigate to Feedback Page
        return this.props.navigation.navigate("Feedback");
    }


    // Occurs when signout is pressed...
    onBackToStaffPress = () => {//Method to Navigate to Staff Page
        return (this.props.navigation.navigate("Staff"))
    }

    onQuizPress = () => {//Method to Navigate to QuizList Page
        return this.props.navigation.navigate("QuizList");
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state; //set state to this.state
        var arr = []; //create array
        Object.keys(state.Quizzes).forEach(function (key) {//for each oject in quizzes
            arr.push(state.Quizzes[key]); //push data to arr
        });
        return (
            <ScrollView style={styles.container} >
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.selectBtn}>
                        <Picker style={styles.Select} selectedValue={this.state.Student} onValueChange={this.updateStudent}>
                            {//fill picker with each student information
                                this.state.StudentID.map((prop, key) => {//map through students
                                    var label = "" + state.StudentName[key] + " " + state.StudentSID[key]
                                    return (
                                        <Picker.Item key={key} label={label} value={prop} />
                                    )
                                })
                            }
                        </Picker>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.loadData}>
                        <Text style={styles.loginText}>Show Student Results</Text>
                    </TouchableOpacity>
                    <View style={styles.table}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Quiz ID</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>Mark</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeader}>View/Edit Feedback?</Text>
                            </View>
                        </View>
                        {
                            //map through student results
                            arr.map((prop, key) => {
                                if (!prop.Mark == "") {//if the quiz has been done
                                    return (
                                        <View key={key} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <View style={styles.cell}>
                                                {/* set table cells as id, mark and button */}
                                                <Text style={styles.inputText}>{prop["Quiz Name"]}{"\n"}ID:{key + 1}</Text>
                                            </View>
                                            <View style={styles.cell}>
                                                <Text style={styles.inputText}>{prop.Mark}</Text>
                                            </View>
                                            <View style={styles.cell}>
                                                <TouchableOpacity style={styles.tableButton} onPress={() => that.onFeedbackPress(state.QuizID[key], state.Student)}>
                                                    <Text style={styles.loginText}>Edit?</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            })

                        }
                    </View>
                    {/* <TouchableOpacity style={styles.inputButton} onPress={this.onQuizPress}>
                        <Text style={styles.loginText}>Open Quiz List</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStaffPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
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
        alignItems: "center",
        justifyContent: "center",
    },
    tableButton: {
        width: "80%",
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
