import React from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store";
import Router from "./router";
import axios from "axios";
axios.defaults.baseURL="http://192.168.18.2:4000"

// import { useFonts, Inter_400Regular, Inter_300Light  } from "@expo-google-fonts/inter";
// import { useFonts, Roboto_300Light, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useFonts, Quicksand_400Regular, Quicksand_500Medium } from "@expo-google-fonts/quicksand";

export default function App() {

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular, Quicksand_500Medium
  });

  if(fontsLoaded){
    let oldRender = Text.render;
    Text.render = function (...args) {
      let origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{ fontFamily: "Quicksand_500Medium"}, origin.props.style]
      });
    };
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}
