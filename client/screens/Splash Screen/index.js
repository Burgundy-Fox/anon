import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({ navigation }) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@access_token");
      if (value !== null) {
        return navigation.replace("MainApp");
      } else {
        return navigation.replace("Login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  setTimeout(() => {
    getData();
  }, 5000);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 200, height: 200, marginTop: 170 }}
          source={require("../../assets/chameleon.png")}
        />
        <Text style={{ fontSize: 15, marginTop: 160 }}>
          Panji - Andhika - Bagus - Jasper {"\n"} © 2021 Made in Burgundy Fox
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 205,
  },
});
