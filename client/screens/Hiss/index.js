import React from "react";
import { View, Text, TextInput } from "react-native";

export default function Hiss() {
  return (
    <View>
      <TextInput
        multiline
        numberOfLines={27}
        style={{ padding: 10, borderWidth: 1, fontSize: 18 }}
        textAlignVertical={"top"}
        placeholder={"What's going on?"}
      />
    </View>
  );
}
