///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';


export default class FeedbackScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Question: "",
            Answer1: "",
            Answer2: "",
            Answer3: "",
            Answer4: "",
            correctAns: "Answer1",
            Quiz: "Computer1"
        };
    }
    updateSelectQuiz = (Quiz) => {//Method to update Quiz state
        this.setState({ Quiz: Quiz })
    }

    updateSelectCorAns = (Ans) => { //Method to update correctAns state
        this.setState({ correctAns: Ans })
    }

    onBackToStaffPress = () => {//Method to navigate to staff page
        return (this.props.navigation.navigate("Staff"))
    }

    onUpdatePress = async () => {//Method to add question
        let that = this;//set that to this
        let state = this.state;//set sate to this.state
        var arr = [];//create arr
        var Quiz = "" + that.state.Quiz //set quiz to state quiz
        var data = {}; //create json object
        switch (this.state.correctAns) {//switch for correct answers
            case 'Answer1'://if answer1 is correct answer
                //Data for Answer
                data = {
                    "answers": [
                        {
                            "correct": true,
                            "id": "1",
                            "text": "" + state.Answer1
                        },
                        {
                            "id": "2",
                            "text": "" + state.Answer2
                        },
                        {
                            "id": "3",
                            "text": "" + state.Answer3
                        },
                        {
                            "id": "4",
                            "text": "" + state.Answer4
                        }
                    ],
                    "question": "" + state.Question
                }
                break;

            case 'Answer2'://if answer2 is correct answer
                //Data for Answer
                data = {
                    "answers": [
                        {
                            "id": "1",
                            "text": "" + state.Answer1
                        },
                        {
                            "correct": true,
                            "id": "2",
                            "text": "" + state.Answer2
                        },
                        {
                            "id": "3",
                            "text": "" + state.Answer3
                        },
                        {
                            "id": "4",
                            "text": "" + state.Answer4
                        }
                    ],
                    "question": "" + state.Question
                }
                break;

            case 'Answer3'://if answer3 is correct answer
                //Data for Answer
                data = {
                    "answers": [
                        {
                            "id": "1",
                            "text": "" + state.Answer1
                        },
                        {
                            "id": "2",
                            "text": "" + state.Answer2
                        },
                        {
                            "correct": true,
                            "id": "3",
                            "text": "" + state.Answer3
                        },
                        {
                            "id": "4",
                            "text": "" + state.Answer4
                        }
                    ],
                    "question": "" + state.Question
                }
                break;

            case 'Answer4'://if answer4 is correct answer
                //Data for Answer
                data = {
                    "answers": [
                        {
                            "id": "1",
                            "text": "" + state.Answer1
                        },
                        {
                            "id": "2",
                            "text": "" + state.Answer2
                        },
                        {
                            "id": "3",
                            "text": "" + state.Answer3
                        },
                        {
                            "correct": true,
                            "id": "4",
                            "text": "" + state.Answer4
                        }
                    ],
                    "question": "" + state.Question
                }
                break;

            default://if invalid
                Alert.alert("Invalid");//alert user that uts invalid
        }


        if (Quiz === "Mobile") {//If selected quiz is the first one
            const documentSnapshot = firestore().collection("Questions").doc(Quiz).update({//Update first quiz with question
                Mobile: firestore.FieldValue.arrayUnion(data)
            }).then(function (docRef) {
                that.onBackToStaffPress();//call back to staff method
            });
        }
        if (Quiz === "Computer1") {//If selected quiz is the second one
            const documentSnapshot = firestore().collection("Questions").doc(Quiz).update({//update second quiz with question
                Computer1: firestore.FieldValue.arrayUnion(data)
            }).then(function (docRef) {
                that.onBackToStaffPress();//call back to staff method
            });
        }
    }

    render() {
        let that = this; // assign this reference to variable that.
        const state = this.state;//let state equal this.state
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2} >
                    <Text style={styles.logo}>Quiz App</Text>
                    <TouchableOpacity style={styles.selectBtn}>
                        <Picker style={styles.Select} selectedValue={this.state.Quiz} onValueChange={this.updateSelectQuiz}>{/* {Picker for quizzes} */}
                            <Picker.Item label="Mobile Quiz 1" value="Computer1" />
                            <Picker.Item label="Mobile Quiz 2" value="Mobile" />
                        </Picker>
                    </TouchableOpacity>
                    <View style={styles.inputLargeView} >
                        <TextInput //Question Input
                            style={styles.inputLargeText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Question: text }) }}
                            placeholder="Question"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput //Answer1 Input
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer1: text }) }}
                            placeholder="Answer 1"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput //Answer2 Input
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer2: text }) }}
                            placeholder="Answer 2"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput //Answer3 Input
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer3: text }) }}
                            placeholder="Answer 3"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput //Answer4 Input
                            style={styles.inputText}
                            value={this.state.feedback}
                            onChangeText={(text) => { this.setState({ Answer4: text }) }}
                            placeholder="Answer 4"
                            //keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity style={styles.selectBtn}>
                        <Picker style={styles.Select} selectedValue={this.state.correctAns} onValueChange={this.updateSelectCorAns}>
                            {/* Picker for whcih answer is the correct one */}
                            <Picker.Item label="Answer 1 is the Correct Answer" value="Answer1" />
                            <Picker.Item label="Answer 2 is the Correct Answer" value="Answer2" />
                            <Picker.Item label="Answer 3 is the Correct Answer" value="Answer3" />
                            <Picker.Item label="Answer 4 is the Correct Answer" value="Answer4" />

                        </Picker>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={() => {
                        if (state.Question === "") {//if input is empty alert user
                            Alert.alert("Enter Question")

                        }
                        else if (state.Answer1 === "") {//if input is empty alert user
                            Alert.alert("Enter 1st Answer")

                        }
                        else if (state.Answer2 === "") {//if input is empty alert user
                            Alert.alert("Enter 2nd Answer")

                        }
                        else if (state.Answer3 === "") {//if input is empty alert user
                            Alert.alert("Enter 3rd Answer")

                        }
                        else if (state.Answer4 === "") {//if input is empty alert user
                            Alert.alert("Enter 4th Answer")

                        } else {//else call onUpdatePress method
                            this.onUpdatePress();
                        }
                    }}>
                        <Text style={styles.loginText}>Add Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputButton} onPress={this.onBackToStaffPress}>
                        <Text style={styles.loginText}>Back to Menu...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    inputLargeView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        //height: "25%",
        marginBottom: 20,
        //justifyContent: "center",
        padding: 5
    },
    inputLargeText: {
        // height: 50,
        textAlignVertical: 'top',
        color: "white"
    },
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
        paddingBottom: 100
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 10
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
