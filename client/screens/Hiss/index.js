import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput } from "react-native";
import { createHiss } from "../../store/actions/hisses";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Hiss({ navigation }) {
  const access_token = useSelector((state) => state.usersReducer.access_token);
  const dispacth = useDispatch();

  const [inputHiss, setInputHiss] = useState("");

  function handleInput(input) {
    setInputHiss(input);
  }

  function handleHiss() {
    dispacth(createHiss(access_token, inputHiss));
    navigation.navigate("Home");
  }

  return (
    <View>
      <TouchableOpacity onPress={() => handleHiss()}>
        <Text>Sent</Text>
      </TouchableOpacity>
      <TextInput
        onChangeText={(input) => handleInput(input)}
        multiline
        numberOfLines={27}
        style={{ padding: 10, borderWidth: 1, fontSize: 18 }}
        textAlignVertical={"top"}
        placeholder={"What's going on?"}
      />
    </View>
  );
}
