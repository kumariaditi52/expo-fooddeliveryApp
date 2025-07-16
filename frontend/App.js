import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Register"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            title: 'Home',
            headerLeft: null, // Disable back button on Home
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
