import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { inputLogin } from "../../store/actions/user";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@access_token");
      //   console.log(value);
      if (value !== null) {
        // value previously stored
        setToken(value);
        navigation.replace("MainApp");
      }
    } catch (e) {
      // error reading value
    }
  };

  function handleLogin() {
    if (!username) {
      Alert.alert("Please fill Username");
    }

    if (!password) {
      Alert.alert("Please fill Password");
    }

    dispatch(inputLogin({ username, password })).then((value) => {
      console.log(value)
      if (value) {
        getData();
      } else {
        Alert.alert("Failed Login!");
      }
    });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={styles.img}
          source={require("../../assets/chameleon.png")}
        />
        <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 10 }}>
          Login
        </Text>
      </View>
      <View style={styles.formCard}>
        <Text style={[styles.font, styles.spacing]}>Username</Text>
        <TextInput
          onChangeText={(input) => setUsername(input)}
          style={[styles.textInput, styles.font, styles.spacing]}
        />

        <Text style={[styles.font, styles.spacing]}>Password</Text>
        <TextInput
          onChangeText={(input) => setPassword(input)}
          style={[styles.textInput, styles.font, styles.spacing]}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, styles.spacing]}
          onPress={() => handleLogin()}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            Login
          </Text>
        </TouchableOpacity>

        <Text style={styles.font}>
          Don't have an account yet?{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ fontWeight: "bold", color: "#808E9B" }}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
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
