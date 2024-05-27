import React, { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContextAuth from "../Context/Auth";

import { Login } from "../Screens/Login";
import { RegisterOpen } from "../Screens/RegisterOpen";

import { Home } from "../Screens/Home";
import { Register } from "../Screens/Register";

export default function () {

    const { user } = useContext(ContextAuth);
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();

    const Dra = () => {
        return (
            <Drawer.Navigator initialRouteName="Registro">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Registro" component={Register} />
            </Drawer.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                {user ?
                    <>
                        <Stack.Screen name="Home" component={Home}></Stack.Screen>
                        <Stack.Screen name="Register" component={Dra}></Stack.Screen>
                    </>
                    :
                    <>
                        <Stack.Screen name="Login" component={Login}></Stack.Screen>
                        <Stack.Screen name="RegisterOpen" component={RegisterOpen}></Stack.Screen>
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}