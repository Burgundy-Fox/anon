import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { editHiss, createHiss, getAllHiss } from "../../store/actions/hisses";

export default function Hiss({ navigation, route }) {
  const baseUrl = "http://192.168.100.53:4000";
  const { access_token } = useSelector((state) => state.usersReducer);
  const [image, setImage] = useState(null);
  let [content, setContent] = useState("");
  let [initalContent, setInitContent] = useState("");
  const dispatch = useDispatch();

  if (route.params && route.params.from === "MyAccount") {
    const { hissId } = route.params;
    axios({
      method: "GET",
      url: `${baseUrl}/hisses/${hissId}`,
      headers: { access_token },
    })
      .then(({ data }) => {
        setInitContent(data.content);
      })
      .catch((err) => console.log(err));
  }

  async function postHiss(hissData) {
    try {
      let token = await AsyncStorage.getItem("@access_token");
      return dispatch(createHiss(hissData, token))
        .then(({ data }) => {
          dispatch(getAllHiss(token));
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function handleHiss() {
    if (route.params && route.params.from === "MyAccount") {
      dispatch(
        editHiss({ hissId: route.params.hissId, content, access_token })
      ).then((result) => {
        if (result) {
          Alert.alert("Edit Success", null, [
            {
              text: "Done",
              onPress: () => navigation.navigate("MyAccount"),
            },
          ]);
        } else {
          Alert.alert("Edit Failed");
        }
      });
    } else {
      if (!content || (!image && !content)) {
        Alert.alert('Please make a "hiss" first');
      } else {
        const formData = new FormData();

        image
          ? formData.append("image", {
              name: "testImage",
              uri: image,
              type: "image/jpg",
            })
          : null;

        content ? formData.append("content", content) : null;

        postHiss(formData).then((result) => {
          // console.log(result);
          if (result) {
            Alert.alert("Hiss Success", null, [
              {
                text: "Done",
                onPress: () => navigation.navigate("MainApp"),
              },
            ]);
          } else {
            Alert.alert("Hiss Failed");
          }
        });
      }
    }
  }

  async function uploadImage() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result.uri);
        }
      }
    }
  }

  return (
    <View style={{ marginTop: 19 }}>
      {/* <Text> {content} </Text> */}
      <TextInput
        multiline
        numberOfLines={10}
        style={{ padding: 10, borderWidth: 1, fontSize: 18 }}
        textAlignVertical={"top"}
        placeholder={"What's going on?"}
        onChangeText={setContent}
        defaultValue={initalContent}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {route.params && route.params.from == "MyAccount" ? (
            <View>
              <MaterialCommunityIcons
                name="image-plus"
                size={24}
                color="grey"
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => uploadImage()}
              style={{ borderRadius: 99, borderWidth: 1, padding: 10 }}
            >
              <MaterialCommunityIcons
                name="image-plus"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          )}

          {image ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "green", marginLeft: 10 }}>
                Image is ready{" "}
              </Text>
              <MaterialCommunityIcons name="check" size={24} color="green" />
            </View>
          ) : (
            false
          )}
        </View>
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
