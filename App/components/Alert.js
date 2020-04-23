///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////

import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    backgroundColor: "#ff4136",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  circleCorrect: {
    backgroundColor: "#28A125"
  },
  icon: {
    width: screen.width / 3
  }
});

export const Alerts = ({ correct, visible }) => { //Exports View as Alert component
  if (!visible) return null;

  const icon = correct //Set Icon Depending on Answer
    ? require("../assets/images/check.png")
    : require("../assets/images/close.png");

  const circleStyles = [styles.circle];

  if (correct) { //If correct Set Answer Icon to Correct
    circleStyles.push(styles.circleCorrect);
  }

  return ( //Custom Alert View
    <View style={styles.container}>
      <View style={circleStyles}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
    </View>
  );
};
