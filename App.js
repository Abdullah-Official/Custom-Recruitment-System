import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import StudentsList from './screens/StudentsList';
import Dashboard from './screens/Dashboard';
import PostVacancy from './screens/PostVacancy';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { PrimaryColor } from './constants/PrimaryColor';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { auth} from './firebase'
import { FontAwesome } from '@expo/vector-icons';

const globalScreenOptions ={
  headerStyle: { backgroundColor: PrimaryColor},
  headerTitleStyle: {color:'white', fontWeight: 'bold', alignSelf:'center', fontSize:17},
  headerTintColor: 'white'
  
  // headerTintColor: {color:'white'},
}

function HomeTabs() {
  const Tab = createBottomTabNavigator();

console.log(auth.currentUser.photoURL)
return (
       <Tab.Navigator 
       tabBarOptions={{
         activeBackgroundColor: PrimaryColor,
         activeTintColor:'white',
         inactiveBackgroundColor:'#203647',
       }}>
      <Tab.Screen options={{tabBarIcon : () => (<FontAwesome name="home" size={22} color="#fff" />)}}  name="Home" component={Home} />
      {auth.currentUser.photoURL ===  "User" ? (<Tab.Screen options={{tabBarIcon : () => (<AntDesign name="profile" size={22} color="#fff" />)}} name="Profile" component={Profile} />) : (<Tab.Screen options={{tabBarIcon : () => (<FontAwesome name="list" size={22} color="#fff" />)}} name="Students" component={StudentsList} />)}
      {auth.currentUser.photoURL ===  "Admin" ? (<Tab.Screen options={{tabBarIcon : () => (<MaterialIcons name="dashboard-customize" size={22} color="#fff" />)}} name="Dashboard" component={Dashboard} />) : (null)}
      {auth.currentUser.photoURL !== "Company" ? (null) : (<Tab.Screen options={{tabBarIcon : () => (<MaterialIcons name="post-add" size={22} color="#fff" />)}} name="Post Vacancy" component={PostVacancy} />)}
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={Signup} />
      <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
