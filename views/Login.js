import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import LoadingDialog from "../components/LoadingDialog";
import AuthContext from "../context/AuthContext";
import Dashboard from "./Dashboard";

function Login({ navigation }) {
  const [userName, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [visible, setVisibility] = useState(false);

  const { setAuthenticated } = useContext(AuthContext);

  const login = async () => {
    setVisibility(true);
    await axios
      .get(
        `https://iot-nodemcu-projects.000webhostapp.com/gestion_etudiants/login.php?cne=${userName}&pass=${password}`
      )
      .then((response) => {
        console.log(response.data.etat);
        setVisibility(false);
        if (response.data.etat) {
          setAuthenticated(response.data.etudiant);
          navigation.navigate("Dashboard");
        } else alert("CNE ou Mot de passe incorrect");
      })
      .catch(() => {
        setVisibility(false);
        alert("CNE ou Mot de passe incorrect");
      });
  };

  return (
    <View style={styles.cantainer}>
      <Image
        style={styles.background}
        source={require("../assets/backgound.jpg")}
      />
      <View style={styles.subView}>
        <Text style={styles.subTxt}>Authentification</Text>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/cne_white.png")}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputText}
            placeholder="Email"
            onChangeText={(user) => {
              setUsername(user);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/pass_white.png")}
          />
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Password"
            onChangeText={(pass) => {
              setPass(pass);
            }}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.btnTxt}>Connexion</Text>
        </TouchableOpacity>
      </View>
      <LoadingDialog visible={visible} />
    </View>
  );
}

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: "#521be3",
    height: "100%",
    fontFamily: "Oswald_Bold",
  },
  subView: {
    position: "absolute",
    backgroundColor: "hsla(198, 19%, 89%, 0.8)",
    width: "100%",
    bottom: 0,
    padding: 30,

    paddingBottom: 20,
    alignItems: "center",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },

  subTxt: {
    color: "black",
    marginTop: 15,
    fontSize: 30,

    marginBottom: 20,
  },
  inputText: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    width: "100%",
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: "hsla(194, 100%, 0%, 0.61)",
    borderRadius: 80,
    borderWidth: 2,

    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  loginTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
  inputContainer: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: "hsla(194, 100%, 0%, 0.61)",
    flexDirection: "row",
    justifyContent: "center",
  },
  inputIcon: {
    height: 20,
    width: 20,
    padding: 5,
    marginLeft: 60,
    marginRight: 15,
    alignSelf: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
});

export default Login;
