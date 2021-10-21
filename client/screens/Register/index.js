import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Register({ navigation }) {
  function handleRegister() {
    navigation.navigate("Login");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={styles.img}
          source={require("../../assets/chameleon.png")}
        />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Register
        </Text>
      </View>
      <View style={styles.formCard}>
        <Text style={[styles.font, styles.spacing]}>Username</Text>
        <TextInput style={[styles.textInput, styles.font, styles.spacing]} />

        <Text style={[styles.font, styles.spacing]}>Email</Text>
        <TextInput style={[styles.textInput, styles.font, styles.spacing]} />

        <Text style={[styles.font, styles.spacing]}>Password</Text>
        <TextInput
          style={[styles.textInput, styles.font, styles.spacing]}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, styles.spacing]}
          onPress={handleRegister}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1E272E",
    padding: 10,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  font: {
    fontSize: 18,
  },
  formCard: {
    backgroundColor: "#fff",
    marginHorizontal: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    padding: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  img: {
    width: 124,
    height: 124,
  },
  spacing: {
    marginBottom: 10,
  },
});
