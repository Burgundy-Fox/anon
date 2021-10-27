import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import store from "./store";
import Router from "./router";

// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function App() {
  //   let [fontsLoaded] = useFonts({
  //     Inter_900Black,
  //   });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}
