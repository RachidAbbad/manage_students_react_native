import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthContext from "./context/AuthContext";
import Login from "./views/Login";
import { useState } from "react";
import Dashboard from "./views/Dashboard";
import Form from "./views/Form";

const Stack = createStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState({});

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            headerMode: "float",
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
