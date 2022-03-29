import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import LoadingDialog from "../components/LoadingDialog";

function Form({ navigation, route }) {
  const [cne, setCne] = React.useState("");
  const [name, setName] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");
  const [btnText, setBtnText] = React.useState("Ajouter");
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (typeof route.params !== "undefined") {
      et = route.params.row;
      setCne(et.cne);
      setName(et.nom);
      setPrenom(et.prenom);
      setPhone(et.phone);
      setEmail(et.email);
      setPass(et.password);
      setBtnText("Modifier");
    }
  }, []);

  const addStudent = () => {
    setVisibility(true);
    axios
      .get(
        `https://iot-nodemcu-projects.000webhostapp.com/gestion_etudiants/ajout.php?cne=${cne}&nom=${name}&prenom=${prenom}&phone=${phone}&email=${email}&pass=${password}`
      )
      .then((response) => {
        setVisibility(false);
        navigation.navigate("Dashboard");
        alert(
          "L'étudiant " + name + " " + prenom + "a été ajouter avec succés"
        );
      })
      .catch((err) => {
        setVisibility(false);
        alert("Erreur durant l'ajout de ce étudiant");
      });
  };

  const editStudent = () => {
    setVisibility(true);
    axios
      .get(
        `https://iot-nodemcu-projects.000webhostapp.com/gestion_etudiants/maj.php?cne=${cne}&nom=${name}&prenom=${prenom}&phone=${phone}&email=${email}&pass=${password}`
      )
      .then((response) => {
        setVisibility(false);
        navigation.navigate("Dashboard");
        alert(
          "L'étudiant " + name + " " + prenom + "a été modifier avec succés"
        );
      })
      .catch((err) => {
        setVisibility(false);
        alert("Erreur durant la modification de ce étudiant");
      });
  };

  const handelClick = () => {
    if (btnText == "Ajouter") addStudent();
    else editStudent();
  };

  return (
    <View style={styles.cantainer}>
      <Image
        style={styles.background}
        source={require("../assets/backgound.jpg")}
      />
      <View style={styles.subView}>
        <View style={{ marginBottom: 17 }}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            size={40}
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/cne_white.png")}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputText}
            placeholder="CNE"
            value={cne}
            readonly
            onChangeText={(cne) => {
              setCne(cne);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/name_white.png")}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputText}
            value={name}
            placeholder="Nom"
            onChangeText={(nom) => {
              setName(nom);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/name_white.png")}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputText}
            value={prenom}
            placeholder="Prenom"
            onChangeText={(prenom) => {
              setPrenom(prenom);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/phone_white.png")}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputText}
            value={phone}
            placeholder="Phone"
            onChangeText={(phone) => {
              setPhone(phone);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/email_white.png")}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputText}
            value={email}
            placeholder="Email"
            onChangeText={(email) => {
              setEmail(email);
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
            style={styles.inputText}
            value={password}
            placeholder="Mot de passe"
            onChangeText={(pass) => {
              setPass(pass);
            }}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handelClick}>
          <Text style={styles.btnTxt}>{btnText}</Text>
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
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    bottom: 20,
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

export default Form;
