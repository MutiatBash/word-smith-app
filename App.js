import * as React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Description from "./pages/description";
import Review from "./pages/Review";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favourites from "./pages/Favourites";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./authContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast, { BaseToast } from "react-native-toast-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
export default function App(props) {
  const toastConfig = {
    info: ({ text1, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: "#411465" }}
        text1={text1}
        text2={props}
      />
    ),
  };
  return (
    // <RootSiblingParent>
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="Description" component={Description} />
            <Stack.Screen name="Review" component={Review} />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
    // </RootSiblingParent>
  );
}
