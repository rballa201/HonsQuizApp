///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import QuizIndex from "./QuizIndex";
import Quiz from "./Quiz";
import QuizEnd from "./QuizEnd";

const MainStack = createStackNavigator({
    QuizIndex: { //Set Quiz Home Screen Naviagtion Options
        screen: QuizIndex,//Set Screen
        navigationOptions: ({ navigation }) => ({ //Set Options Such as Colous,visibilty etc for navigation header
            headerTitle: "Quizzes",
            headerTintColor: "#fb5b5a",
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: "#003f5c",
                borderBottomColor: "#003f5c"
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 50,
                padding: 5
            }
        })
    },
    Quiz: { //Set Quiz Taking Screen Naviagtion Options
        screen: Quiz,//Set Screen
        navigationOptions: ({ navigation }) => ({//Set Options Such as Colous,visibilty etc for navigation header
            headerTitle: navigation.getParam("title"),
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: navigation.getParam("color"),
                borderBottomColor: navigation.getParam("color")
            }
        })
    },
    // QuizEnd: { //Set Quiz End Screen
    //     screen: QuizEnd,//Set Screen
    //     navigationOptions: ({ navigation }) => ({//Set Options Such as Colous,visibilty etc for navigation header
    //         headerTitle: navigation.getParam("title"),
    //     })
    // }
});

export default createAppContainer(MainStack);