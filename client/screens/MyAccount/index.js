import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { auth } from '../../firebase/firebase'

export default function MyAccount({ navigation }) {
  const handleLogOut = async () => {
    try {
      await AsyncStorage.clear();
      await auth.signOut()
      navigation.replace("Login");
    } catch (e) {
      console.log(e)
      // clear error
    }

    // console.log("Done.");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/150/54176f" }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 150 / 2,
        }}
      />
      <Text style={{ fontSize: 18, color: "#808E9B", marginTop: 5 }}>
        Change Avatar
      </Text>
      <Text style={{ fontSize: 24, marginTop: 8 }}>Leopoldo_Corkery</Text>
      <Text style={{ fontSize: 20, marginTop: 8 }}>
        <Ionicons name="wallet" size={30} color="black" /> Rp. 5000
      </Text>
      <TouchableOpacity
        style={[styles.button, { marginTop: 8 }]}
        onPress={() => handleLogOut()}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1E272E",
    padding: 10,
  },
});
