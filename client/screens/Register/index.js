import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { inputRegister } from "../../store/actions/user";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.usersReducer.isRegister);

  useEffect(() => {
    if (user) {
      navigation.navigate("Login");
      setUsername("");
      setEmail("");
      setPassword("");
    }

    return () => {
      setUsername("");
      setEmail("");
      setPassword("");
      dispatch(inputRegister({ username, email, password }));
    };
  }, [user]);

  function handleRegister() {
    if (!username) {
      Alert.alert("Please fill Username");
    }
    if (!email) {
      Alert.alert("Please fill Email");
    }
    if (!password) {
      Alert.alert("Please fill Password");
    }

    dispatch(inputRegister({ username, email, password }));
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
        <TextInput
          onChangeText={(text) => setUsername(text)}
          style={[styles.textInput, styles.font, styles.spacing]}
        />

        <Text style={[styles.font, styles.spacing]}>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={[styles.textInput, styles.font, styles.spacing]}
        />

        <Text style={[styles.font, styles.spacing]}>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={[styles.textInput, styles.font, styles.spacing]}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, styles.spacing]}
          onPress={() => handleRegister()}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            Register
          </Text>
        </TouchableOpacity>
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
