import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [allHis, setAllHiss] = useState([
    {
      id: 1,
      username: "Bret",
      content: "accusamus beatae ad facilis cum similique qui sunt",
      avatar: "https://via.placeholder.com/600/92c952.png",
      image_url: "https://via.placeholder.com/150/92c952.png",
    },
    {
      id: 2,
      username: "Antonette",
      content: "reprehenderit est deserunt velit ipsam",
      avatar: "https://via.placeholder.com/600/771796.png",
      image_url: "https://via.placeholder.com/150/771796.png",
    },
    {
      id: 3,
      username: "Samantha",
      content: "officia porro iure quia iusto qui ipsa ut modi",
      avatar: "https://via.placeholder.com/600/24f355.png",
      image_url: "https://via.placeholder.com/150/24f355.png",
    },
    {
      id: 4,
      username: "Karianne",
      content: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      avatar: "https://via.placeholder.com/600/d32776.png",
      image_url: "https://via.placeholder.com/150/d32776.png",
    },
    {
      id: 5,
      username: "Kamren",
      content: "natus nisi omnis corporis facere molestiae rerum in",
      avatar: "https://via.placeholder.com/600/f66b97.png",
      image_url: "https://via.placeholder.com/150/f66b97.png",
    },
    {
      id: 6,
      username: "Leopoldo_Corkery",
      content: "accusamus ea aliquid et amet sequi nemo",
      avatar: "https://via.placeholder.com/600/56a8c2.png",
      image_url: "https://via.placeholder.com/150/56a8c2.png",
    },
    {
      id: 7,
      username: "Elwyn.Skiles",
      content:
        "officia delectus consequatur vero aut veniam explicabo molestias",
      avatar: "https://via.placeholder.com/600/b0f7cc.png",
      image_url: "https://via.placeholder.com/150/b0f7cc.png",
    },
    {
      id: 8,
      username: "Maxime_Nienow",
      content: "aut porro officiis laborum odit ea laudantium corporis",
      avatar: "https://via.placeholder.com/600/54176f.png",
      image_url: "https://via.placeholder.com/150/54176f.png",
    },
  ]);

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:3000/hiss")
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   }, []);

  function handleReply() {
    navigation.navigate("Reply");
  }

  function handleLike() {
    console.log("like bertambah 1");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allHis}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View
              key={item.id}
              style={{
                marginBottom: 5,
                borderBottomColor: "black",
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                style={styles.img}
                key={item.id}
                onPress
              />

              <View style={{ marginLeft: 8 }}>
                <Text style={{ marginVertical: 5, fontSize: 16 }}>
                  {item.username}
                </Text>
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 100, height: 100, marginVertical: 5 }}
                  key={item.id}
                />
                <Text style={{ fontSize: 18 }}>{item.content}</Text>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity onPress={() => handleReply()}>
                    <FontAwesome
                      name="comment-o"
                      size={18}
                      color="black"
                      style={{ marginLeft: 110 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleLike()}>
                    <AntDesign
                      name="hearto"
                      size={18}
                      color="black"
                      style={{ marginLeft: 50 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
