import React, { useContext } from "react";
import { Avatar, Header, Tooltip } from "react-native-elements";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  BackHandler,
} from "react-native";
import AuthContext from "../context/AuthContext";

const CustomHeader = ({ name, nom, prenom, navigation }) => {
  return (
    <Header
      style={styles.container}
      backgroundColor="#22A7F0"
      rightComponent={
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "black", fontSize: 17, marginTop: 7 }}>
            Logout
          </Text>
        </TouchableOpacity>
      }
      centerComponent={{
        text: name,
        style: {
          color: "#fff",
          fontSize: 22,
          marginTop: 5,
        },
      }}
      leftComponent={
        <View style={styles.avatarStyle}>
          <Avatar
            size="small"
            rounded
            titleStyle={{ color: "black" }}
            title={nom[0].toUpperCase() + prenom[0].toUpperCase()}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0b7fab",
  },
  avatarStyle: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "white",
    alignItems: "center",
    width: 80,
    height: 35,
    borderRadius: 15,
  },
});

export default CustomHeader;
