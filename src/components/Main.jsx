
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import EvaluatorScreen from '../screens/EvaluatorScreen';
import QuestionScreen from '../screens/QuestionScreen';
import EvaluatorResultScreen from '../screens/EvaluatorResultScreen';



function MyStack(){
  return (
      <Stack.Navigator initialRouteName="HomeScreen">
        
          <Stack.Screen
          name = "HomeScreen"
          component={HomeScreen}
          options = {{
            headerShown: false
          }}
          />

        <Stack.Screen
          name='EvaluatorScreen'
          component={EvaluatorScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'QuestionScreen'
          component={QuestionScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='EvaluatorResultScreen'
          component={EvaluatorResultScreen}
          options = {{
            headerShown: false
          }}
        />
        
        
      </Stack.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const Main = () => {
    return (
    
    // <NavigationContainer>
    //   <UserProvider>
    //     <MyStack /> 
    //   </UserProvider>
    // </NavigationContainer>
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

export default Main 

