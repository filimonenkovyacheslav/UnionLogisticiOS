import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn/SignIn';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import Home from '../screens/Home/Home';
import Tasks from '../screens/Tasks/Tasks';
import Scan from '../screens/Scan/Scan';
import AddTracking from '../screens/AddTracking/AddTracking';
import NewPacking from '../screens/NewPacking/NewPacking';
import DuplicatePacking from '../screens/DuplicatePacking/DuplicatePacking';
import ScanList from '../screens/ScanList/ScanList';
import AddTrackingList from '../screens/AddTrackingList/AddTrackingList';
import SearchByChecklist from '../screens/SearchByChecklist/SearchByChecklist';
import AddReceipt from '../screens/AddReceipt/AddReceipt';
import ChooseListName from '../screens/ChooseListName/ChooseListName';
import ChooseMethod from '../screens/ChooseMethod/ChooseMethod';


const Closed = createNativeStackNavigator();
const Main = createNativeStackNavigator();

function ClosedNav() {
  return (
    <Closed.Navigator>
      <Closed.Screen name="Welcome to Union Logistics" component={WelcomeScreen} />
      <Closed.Screen name="Sign In" component={SignIn} />
    </Closed.Navigator>
  );
}

function MainNav() {
  return (
    <Main.Navigator>
      <Main.Screen name="Home" component={Home} />
      <Main.Screen name="Tasks" component={Tasks}
        listeners={{
          focus: (e) => {
            e.target.updateTasksScreen
          },
        }}
      />
      <Main.Screen name="Scan" component={Scan} />
      <Main.Screen name="Add Tracking" component={AddTracking} />
      <Main.Screen name="New Packing List" component={NewPacking} />
      <Main.Screen name="Duplicate Packing List" component={DuplicatePacking} />
      <Main.Screen name="Scan Tracking to List" component={ScanList} />
      <Main.Screen name="Add Tracking to List" component={AddTrackingList} />
      <Main.Screen name="Search by checklist" component={SearchByChecklist} />
      <Main.Screen name="Add Receipt" component={AddReceipt} />
      <Main.Screen name="Choose List Name" component={ChooseListName} />
      <Main.Screen name="Choose Method" component={ChooseMethod} />
    </Main.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (

    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false
      }}
    >
      <Drawer.Screen
        name="Logout"
        component={ClosedNav}
        options={
          { headerShown: false }
        }
      />
      <Drawer.Screen
        name="Home page"
        component={MainNav}
        options={
          { headerTitle: "" }
        }
      />
    </Drawer.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}
