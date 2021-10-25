import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SvgUri } from "react-native-svg";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { destroyHiss, getAllHiss } from "../../store/actions/hisses";
import Hiss from "../../components/Hiss";

export default function Home({ navigation, route }) {
  const access_token = useSelector((state) => state.usersReducer.access_token);
  const dataHiss = useSelector((state) => state.hissesReducer.dataHiss);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHiss(access_token));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataHiss}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <Hiss item={item} route={route.name} />;
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
    borderWidth: 1,
  },
});
