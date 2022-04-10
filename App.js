import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import Home from './Components/Home';
import AddContact from './Components/AddContact';
import ViewProfile from './Components/ViewProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Contact List',
          headerStyle: {
            backgroundColor: '#1488CC',
          },
          headerTintColor: '#e9e4d4',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Inter_900Black'
          },
          headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="Add Contact"
          component={AddContact}
          options={{ title: 'Add Contact',
          headerStyle: {
            backgroundColor: '#aa076b',
          },
          headerTintColor: '#e9e4d4',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Inter_900Black'
          }
          }}
        />
        <Stack.Screen
          name="View Profile"
          component={ViewProfile}
          options={{ title: 'View Profile',
          headerStyle: {
            backgroundColor: '#8A2387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Inter_900Black',
            
          }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c1c4c9',
    marginTop : Constants.statusBarHeight,
  },
});
