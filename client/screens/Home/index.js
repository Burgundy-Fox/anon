import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Loader from "../../components/Loader";

import { getAllHiss } from "../../store/actions/hisses";
import { getUserDetails } from "../../store/actions/user";
import Hiss from "../../components/Hiss";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation, route }) {
  const { dataHiss } = useSelector((state) => state.hissesReducer);

  const dispatch = useDispatch();

  async function initialStore() {
    try {
      let token = await AsyncStorage.getItem("@access_token");
      dispatch({ type: "SET_ACCESS_TOKEN", payload: token });
      dispatch(getAllHiss(token));
      dispatch(getUserDetails(token));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    initialStore();
  }, []);

  if (!dataHiss.length) {
    return (
        <Loader/>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/chameleon-pattern3.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <FlatList
          data={dataHiss}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Hiss item={item} route={route.name} navigation={navigation} />
            );
          }}
        />
      </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});
