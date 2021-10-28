import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

import { Feather } from "@expo/vector-icons";

export default function index({ navigation }) {
  const { access_token } = useSelector((state) => state.usersReducer);

  function midtransWeb(price) {
    axios({
      method: "post",
      url: `/transaction/midtransToken`,
      data: {
        price,
      },
      headers: { access_token },
    })
      .then(({ data }) => {
        navigation.navigate("Webview", { url: data.transaction.redirect_url });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={[styles.container]}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 18 }}>
        Choose nominal
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: 350,
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => midtransWeb(5000)}
        >
          <Image
            style={styles.img}
            source={require("../../assets/dollar.png")}
          />
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rp. 5000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => midtransWeb(10000)}
        >
          <Image
            style={styles.img}
            source={require("../../assets/dollar-4.png")}
          />
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rp. 10000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => midtransWeb(15000)}
        >
          <Image
            style={styles.img}
            source={require("../../assets/dollar-2.png")}
          />
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rp. 15000</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: 350,
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => midtransWeb(20000)}
        >
          <Image
            style={styles.img}
            source={require("../../assets/dollar-5.png")}
          />
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rp. 20000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => midtransWeb(50000)}
        >
          <Image
            style={styles.img}
            source={require("../../assets/dollar-7.png")}
          />
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rp. 50000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => midtransWeb(100000)}
        >
          <Image
            style={styles.img}
            source={require("../../assets/dollar-6.png")}
          />
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rp. 100000</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Feather name="info" size={24} color="rgba(116, 125, 140,1.0)" />
        <Text style={{ fontSize: 18, color: "rgba(116, 125, 140,1.0)" }}>
          {" "}
          Top up any amount for special border
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 35,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 60,
    width: 90,
    height: 90,
  },
  img: {
    width: 60,
    height: 60,
  },
});
