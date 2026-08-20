import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SearchScreen from '../screens/SearchScreen';
import ResultsScreen from '../screens/ResultsScreen';
import BookingScreen from '../screens/BookingScreen';
import TicketsScreen from '../screens/TicketsScreen';
import TicketDetailScreen from '../screens/TicketDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="My Tickets" component={TicketsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator(){
  const {userToken, loading} = useContext(AuthContext);
  if(loading) return null;
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {userToken ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
