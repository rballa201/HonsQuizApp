///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import React from "react";
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, Text, View, Alert } from "react-native";
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AsyncStorage } from 'react-native';

import { RowItem } from "../../components/RowItem"; //Import Custom Row Item Component

export default ({ navigation }) => (
  <ScrollView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <RowItem
      name="Mobile Quiz 1" //Name of Row Item
      color="#49475B" //Colour of Row Item
      onPress={async () => { //Set on press Event

        let that = this; //set that equal to this
        var arr = []; //create empty array
        const documentSnapshot = firestore().collection("Questions");//Set Refrenece to Questions Collection
        await AsyncStorage.setItem('Quiz', "Mobile Quiz 1"); //Set Item in Async Storage
        documentSnapshot.doc("Computer1").get().then(function (doc) {//Get Qiuz Questions then
          if (doc.exists) { //if document exists
            var array = doc.data().Computer1; //Set array to equal array of quiz questions
            navigation.navigate("Quiz", { //Navigate to Qiz with following data
              title: "Mobile Quiz 1",//Quiz Title
              questions: array,//Questions
              color: "#49475B"//Color
            })
          }
        })
      }}
    />

    <RowItem
      name="Mobile Quiz 2" //Name of Row Item
      color="#49475B" //Colour of Row Item
      onPress={async () => { //Set on press Event

        let that = this; //set that equal to this
        var arr = []; //create empty array
        const documentSnapshot = firestore().collection("Questions");//Set Refrenece to Questions Collection

        await AsyncStorage.setItem('Quiz', "Mobile Quiz 2"); //Set Async Storage Item
        documentSnapshot.doc("Mobile").get().then(function (doc) { //Get Quiz Questions Then
          if (doc.exists) { //if documents exists
            var array = doc.data().Mobile;//Set array to equal array of quiz questions
            navigation.navigate("Quiz", {//Navigate to Qiz with following data
              title: "Mobile Quiz 2",//Quiz Title
              questions: array,//Questions
              color: "#49475B"//Color
            })
          }
        })
      }}
    />

    <View style={styles.container2}>
      <TouchableOpacity style={styles.inputButton} onPress={() => {//Navigate back to STudent Page on press
        navigation.navigate("Student");
      }}>
        <Text style={styles.loginText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#003f5c',
  }, container2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
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
  }, loginText: {
    color: "white"
  }
});
