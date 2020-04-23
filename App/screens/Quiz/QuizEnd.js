// ///////////////////////////////////////////
// /// Name: Ryan Ballantine
// /// Matric Number: S1829049
// /// Title: Honours Code
// ////////////////////////////////////////////
// import React from 'react';
// import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity } from 'react-native';
// import firebase from '@react-native-firebase/app'
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import Questions from "../../data/computers"
// import { AsyncStorage } from 'react-native';
// import questions from '../../data/computers';

// //UNUSED CLASS DUE TO USER FEEDBACK
// export default class QuizEnd extends React.Component {
//     static navigationOptions = {
//         header: null,
//     };

//     constructor(props) {
//         super(props);
//         this.state = {
//             totalCount: 0,
//             Questions: [],
//             answers: [],
//             answerTxt: [],
//             Quiz: ""
//             //totalCount: Questions.length,
//         };
//     }

//     _retrieveData = async () => {
//         try {
//             const value = await AsyncStorage.getItem('TotalCount');
//             const QuizName = await AsyncStorage.getItem('Quiz');

//             this.setState({
//                 totalCount: value,
//                 Quiz: QuizName
//             })
//             await AsyncStorage.removeItem('TotalCount');
//             for (let index = 1; index <= this.state.totalCount; index++) {
//                 try {
//                     const question = await AsyncStorage.getItem('Question' + index);
//                     const value1 = await AsyncStorage.getItem('Question' + index + ' Answer');
//                     const value = await AsyncStorage.getItem('Question' + index + ' Answer Status');
//                     // this.setState({
//                     //     totalCount: value
//                     // })
//                     //
//                     //alert(JSON.stringify(question));
//                     this.state.answers.push(value);
//                     this.state.Questions.push(question);
//                     this.state.answerTxt.push(value1);
//                     await AsyncStorage.removeItem('Quesion' + index);
//                     await AsyncStorage.removeItem('Question' + index + ' Answer Status');
//                     await AsyncStorage.removeItem('Question' + index + ' Answer');
//                 } catch (error) {
//                     Alert.alert("error1");
//                 }
//             }
//             //Alert.alert(JSON.stringify(this.state.answers[0]));
//             this.onQuizPress();
//         } catch (error) {
//             // Error retrieving data
//             Alert.alert("error2");
//         }
//     };

//     onQuizPress = () => {
//         var userId = auth().currentUser.uid;
//         let that = this;

//         //Alert.alert(JSON.stringify(this.state.answers.length));
//         const documentSnapshot = firestore().collection("Users").doc(userId).collection("Quizzes");
//         //var postsRef = firebase.database().ref("Quizzes/" + userId);
//         ////var newPostRef = postsRef.push();
//         //var postId = newPostRef.key;
//         //let db = firebase.firestore();
//         //let docRef = db.collection('Quizzes').doc(uid).collection();
//         documentSnapshot.add({}).then(function (docRef) {
//             var docid = docRef.id;
//             //Alert.alert("" + docid);

//             var correct = 0
//             var totalCount = that.state.answers.length

//             for (let index = 0; index < that.state.answers.length; index++) {
//                 if (that.state.answers[index] === "true") {
//                     correct = correct + 1
//                 }
//             }



//             var total = correct / totalCount * 100;
//             var total = Math.round((total + Number.EPSILON) * 100) / 100
//             var Percentage = "" + total + "/100"
//             //var obj = {};


//             const ref = documentSnapshot.doc(docid);
//             const Quiz = {
//                 Mark: "" + [Percentage],
//                 ["Quiz Name"]: "" + [that.state.Quiz]
//             }
//             ref.set(Quiz, { merge: true })

//             // postsRef.child("" + postId).update({
//             //     Mark: "" + [Percentage],
//             // })


//             for (let index = 0; index < that.state.answers.length; index++) {
//                 var data1 = index + 1;
//                 var data = "Question " + data1 + " Answer Status";
//                 var data3 = "Question " + data1;
//                 var data2 = "Question " + data1 + " Answer";
//                 var value = that.state.answers[index];
//                 var value1 = that.state.Questions[index];
//                 var value2 = that.state.answerTxt[index];
//                 var bvalue;
//                 if (value === "true") {
//                     bvalue = true;
//                 };
//                 if (value === "false") {
//                     bvalue = false
//                 };
//                 //var bvalue = value == "true";
//                 const Quiz1 = {
//                     [data3]: value1,
//                     [data2]: value2,
//                     [data]: bvalue
//                 }
//                 ref.set(Quiz1, { merge: true })
//             }
//             const Quiz2 = {
//                 feedback: ""
//             }
//             ref.set(Quiz2, { merge: true })
//             //that.props.navigation.popToTop();
//         })

//         //Alert.alert("" + docid);


//     }

//     render() {

//         // var user = firebase.auth().currentUser;
//         // var name, email, photoUrl, uid, emailVerified;

//         // if (user != null) {
//         //     name = user.password;
//         //     email = user.email;
//         //     //photoUrl = user.photoURL;
//         //     //emailVerified = user.emailVerified;
//         //     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//         //     // this value to authenticate with your backend server, if
//         // }
//         return (


//             <ScrollView style={styles.container}>
//                 <View style={styles.container2} >
//                     <Text style={styles.logo}>Quiz App</Text>
//                     <TouchableOpacity style={styles.inputButton} onPress={this._retrieveData}>
//                         <Text style={styles.loginText}>Submit Quiz</Text>
//                     </TouchableOpacity>
//                     {/* <TouchableOpacity style={styles.inputButton} onPress={this.onSignoutPress}>
//                         <Text style={styles.loginText}>Sign Out</Text>
//                     </TouchableOpacity> */}

//                 </View>
//             </ScrollView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#003f5c',
//         //alignItems: 'center',
//         //justifyContent: 'center',
//     },
//     container2: {
//         //flex: 1,
//         backgroundColor: '#003f5c',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     logo: {
//         fontWeight: "bold",
//         fontSize: 50,
//         color: "#fb5b5a",
//         marginBottom: 40
//     },
//     inputView: {
//         width: "80%",
//         backgroundColor: "#465881",
//         borderRadius: 25,
//         height: 50,
//         marginBottom: 20,
//         justifyContent: "center",
//         padding: 20
//     },
//     inputText: {
//         height: 50,
//         color: "white"
//     },
//     forgot: {
//         color: "white",
//         fontSize: 11
//     },
//     inputButton: {
//         width: "80%",
//         backgroundColor: "#fb5b5a",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 40,
//         marginBottom: 10
//     },
//     signUpBtn: {
//         width: "80%",
//         backgroundColor: "blue",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 5,
//         marginBottom: 10,
//         display: "flex"
//     },
//     disappear: {
//         display: "none"
//     },
//     Selected: {
//         width: "40%",
//         backgroundColor: "green",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 40,
//         marginBottom: 0,
//         marginLeft: "25%",
//         marginRight: "25%",
//         flexDirection: 'row'
//     },
//     notSelected: {
//         width: "40%",
//         backgroundColor: "#003f5c",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 40,
//         marginBottom: 0,
//         marginLeft: "25%",
//         marginRight: "25%",
//         flexDirection: 'row'
//     },
//     loginText: {
//         color: "white"
//     }
// });
