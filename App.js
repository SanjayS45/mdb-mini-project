import 'react-native-gesture-handler'; // THIS MUST BE AT THE VERY TOP
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import CurrentVibeScreen from './screens/CurrentVibesScreen';
import BrowseVibesScreen from './screens/BrowseVibesScreen';

// basic stacknavigator 

const Stack = createStackNavigator();

export default function App() {

  // 1) On line 32, create 3 screens using React Navigation
  // HINT: use Stack.Screen
  // HINT: it should have name, component, and options
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        


        
      </Stack.Navigator>
    </NavigationContainer>
  );
}