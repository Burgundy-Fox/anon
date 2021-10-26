import React from "react";
import { View, Text, TextInput } from "react-native";

export default function Reply() {
  return (
    <View>
      <TextInput
        multiline
        numberOfLines={27}
        style={{ padding: 10, borderWidth: 1, fontSize: 18 }}
        textAlignVertical={"top"}
        placeholder={"Hiss your reply"}
      />
    </View>
  );
}
