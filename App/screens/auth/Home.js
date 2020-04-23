///////////////////////////////////////////
/// Name: Ryan Ballantine
/// Matric Number: S1829049
/// Title: Honours Code
////////////////////////////////////////////
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Staff from "../Main/Staff/StaffEntry";
import Student from "../Main/Student/StudentEntry";
import Quiz from '../Quiz/index';
import QuizList from "../Main/Staff/QuizList";
import Feedback from "../Main/Staff/Feedback";
import EditDetails from "../Main/Student/EditDetails";
import StudentResults from "../Main/Student/StudentResults";
import StaffResult from "../Main/Staff/StaffResult";
import AddQuestions from "../Main/Staff/AddQuestions";
import ViewFeedback from "../Main/Student/ViewFeedback";
import StaffSignUp from "./StaffSignUp";


const MainNavigator = createStackNavigator({
    ///Setting Up all Navigation for the Screens
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    StaffSignUp: { screen: StaffSignUp },
    ForgotPassword: { screen: ForgotPassword },
    Student: { screen: Student },
    Staff: { screen: Staff },
    Quiz: { screen: Quiz },
    QuizList: { screen: QuizList },
    Feedback: { screen: Feedback },
    ViewFeedback: { screen: ViewFeedback },
    EditDetails: { screen: EditDetails },
    StudentResults: { screen: StudentResults },
    StaffResult: { screen: StaffResult },
    AddQuestions: { screen: AddQuestions }


},
    {//Setting Navigation Header Visibilty
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const App = createAppContainer(MainNavigator);

export default App;