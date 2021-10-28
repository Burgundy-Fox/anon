import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { createHiss, getAllHiss } from "../../store/actions/hisses";

export default function Reply({ navigation, route }) {
  const [reply, setReply] = useState(route.params.username);
  const { access_token } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  function handleHiss() {
    const formData = new FormData();
    formData.append("content", reply);

    dispatch(createHiss(formData, access_token))
      .then(({ data }) => {
        dispatch(getAllHiss(access_token));
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={{ marginTop: 19 }}>
      <TextInput
        multiline
        numberOfLines={10}
        style={{ padding: 10, borderWidth: 1, fontSize: 18 }}
        textAlignVertical={"top"}
        placeholder={"Hiss your reply"}
        onChangeText={setReply}
        value={reply}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => handleHiss()}
          style={{ borderRadius: 99, borderWidth: 1, padding: 10 }}
        >
          <FontAwesome name="send" size={24} color="black" on />
        </TouchableOpacity>
      </View>
    </View>
  );
}
