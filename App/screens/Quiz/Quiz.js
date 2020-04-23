///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert } from "react-native";
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Button, ButtonContainer } from "../../components/Button";
import { Alerts } from "../../components/Alert";
import { AsyncStorage } from 'react-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

class Quiz extends React.Component {

  state = {
    Count: 0,
    totalCount: this.props.navigation.getParam("questions", [""]).length,//Get Length of questions array passed from Index page
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false,
    Questions: [],
    answers: [],
    answerTxt: [],
    Quiz: ""
  };

  _retrieveData = async () => {
    const QuizName = await AsyncStorage.getItem('Quiz');//Get Quiz Item from Async Storage
    this.setState({ //Set State
      Quiz: QuizName
    })
    for (let index = 1; index <= this.state.totalCount; index++) {//Loop using Total amount of questions
      try {
        const question = await AsyncStorage.getItem('Question' + index);//get current indexed question
        const value1 = await AsyncStorage.getItem('Question' + index + ' Answer');//get current indexed answer
        const value2 = await AsyncStorage.getItem('Question' + index + ' Answer Status');//get current indexed answer status
        this.state.answers.push(value2);//Push Answer Status to State
        this.state.Questions.push(question);//Push Question to State
        this.state.answerTxt.push(value1);//Push Answer to State
        await AsyncStorage.removeItem('Quesion' + index); //Remove Item from Async Storage
        await AsyncStorage.removeItem('Question' + index + ' Answer Status');//Remove Item from Async Storage
        await AsyncStorage.removeItem('Question' + index + ' Answer');//Remove Item from Async Storage
      } catch (error) {
      }
    }
    this.onQuizPress();//Call onQuizPress Method
  };

  onQuizPress = () => {//Submit Quiz Method
    var userId = auth().currentUser.uid; //set variable to current user id
    let that = this; //set that equal to this
    const documentSnapshot = firestore().collection("Users").doc(userId).collection("Quizzes");//referenceto quiz collection
    documentSnapshot.add({}).then(function (docRef) {//add empty document then
      var docid = docRef.id; //get document id
      var correct = 0; //set correct to qual 0
      var totalCount = that.state.answers.length //set total count to amount of answers
      for (let index = 0; index < that.state.answers.length; index++) { //loop through and set correct to eqal amount of correct answers
        if (that.state.answers[index] === "true") {//if answer was correct
          correct = correct + 1
        }
      }
      var total = correct / totalCount * 100;//calcuate mark
      var total = Math.round((total + Number.EPSILON) * 100) / 100//calculate rounded mark
      var Percentage = "" + total + "/100"//Set mark out of 100

      const ref = documentSnapshot.doc(docid);//reference to document
      const Quiz = {
        Mark: "" + [Percentage],
        ["Quiz Name"]: "" + [that.state.Quiz]
      }//Quiz data to add to document
      ref.set(Quiz, { merge: true })//Add to document

      for (let index = 0; index < that.state.answers.length; index++) {//loop through all answers
        var data1 = index + 1; //set number of question
        var data3 = "Question " + data1;//String Question Number
        var data2 = "Question " + data1 + " Answer";//String Question Number Answer 
        var value = that.state.answers[index]; //set value to current indexed answer status
        var value1 = that.state.Questions[index]; //set value1 to current indexed Question
        var value2 = that.state.answerTxt[index]; //set value to icurrent indexed answertxt
        var bvalue;
        if (value === "true") { //if answer was correct
          bvalue = "Correct"; //set variable to string correct
        };
        if (value === "false") {//if answer was incorrect
          bvalue = "Incorrect" //set varialable to string incorrect
        };
        const Quiz1 = {
          [data3]: value1,
          [data2]: value2 + ": " + bvalue
        }//Quiz Data to be added
        ref.set(Quiz1, { merge: true })//add data to document
      }//end loop
      const Quiz2 = {
        feedback: ""
      }//quiz data to be added
      ref.set(Quiz2, { merge: true })//add quiz data to document
    })
  }

  answer = (correct, text) => {//Method for setting answer
    let questions = this.props.navigation.getParam("questions", [""]);//get array of questions
    let question = questions[this.state.activeQuestionIndex]; //set question to current question

    this.setState(
      state => {
        const nextState = { answered: true };//set answered to true
        if (correct) {//if answer was correct
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1), question.question);//Set question in AsyncStorage
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1) + " Answer", text);//Set answer in AsyncStorage
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1) + " Answer Status", JSON.stringify(true));//Set ansswer status in AsyncStorage
          nextState.Count = state.Count + 1; //increment count
          nextState.answerCorrect = true; //set answercorrect to true
        } else {//if answer anything but correct
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1), question.question); //Set question in AsyncStorage
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1) + " Answer", text); //Set answer in AsyncStorage
          AsyncStorage.setItem('Question' + JSON.stringify(this.state.Count + 1) + " Answer Status", JSON.stringify(false));//Set answer status in AsyncStorage
          nextState.Count = state.Count + 1;//increment count
          nextState.answerCorrect = false;//set answercorrect to false
        }

        return nextState; //return nextState
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);//Set timeout then next question is called
      }
    );
  };

  nextQuestion = () => {//Method for getting next question
    this.setState(state => {//set state
      let nextIndex = state.activeQuestionIndex + 1;//incrementactive index
      if (nextIndex >= state.totalCount) { //if the next index is greater than or equal to the amount of questions
        this._retrieveData(); //retrive and store data on firestore
        Alert.alert('Quiz Complete!\nPlease View Results')//alert user that quiz has finished
        return this.props.navigation.navigate("Student");//navigate to student page
        //nextIndex === 0;
      }

      return {
        activeQuestionIndex: nextIndex,//return active question index is nextindex
        answered: false //return answered is false
      };
    });
  };


  render() {
    var user = auth().currentUser;//set user equal to current user
    if (user = null) { //if no-one signe din head back to login
      return (this.props.navigation.popToTop())
    }
    let questions = this.props.navigation.getParam("questions", [""]);//get question array
    let question = questions[this.state.activeQuestionIndex];//set question to equal current question
    return ( //Return background colour of quiz
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") }
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{question.question}</Text>

            <ButtonContainer>
              {question.answers.map(answer => (//mp through each answer for the question and create a button for them

                <Button
                  key={answer.id}//answer id is button key
                  text={answer.text}//answe ris button text
                  onPress={() => {//on press call answer function if button already hasnt been pressed
                    if (this.state.answered === false) {
                      this.answer(answer.correct, answer.text)
                    }
                  }}
                />
              ))}
            </ButtonContainer>
          </View>

          <Text style={styles.text}>
            {`${this.state.Count}/${this.state.totalCount}`//Show Question Numbers
            }
          </Text>
        </SafeAreaView>
        <Alerts //Set Up Alert Component for answer
          correct={this.state.answerCorrect
          }
          visible={this.state.answered}
        />
      </View>
    );
  }
}

export default Quiz;
