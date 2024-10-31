// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LocationScreen from './screens/LocationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Screen01">
        <Stack.Screen name="Screen01" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Screen02" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Screen03" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Screen04" component={LocationScreen} options={{ headerShown: false }} />   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
