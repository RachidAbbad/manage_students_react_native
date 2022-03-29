import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Form from "../views/Form";
import CustomHeader from "../components/CustomHeader";
import ItemList from "../components/ItemList";
import { FlatList } from "react-native";
import LoadingDialog from "../components/LoadingDialog";

export default function Dashboard({ navigation }) {
  const [search_txt, setSearch_txt] = useState("");
  const { authenticated } = useContext(AuthContext);
  const [etudiantList, setEtudiantList] = useState([]);
  const [visible, setVisibility] = useState(false);

  async function getEtudiants() {
    setVisibility(true);
    await axios
      .get(
        "https://iot-nodemcu-projects.000webhostapp.com/gestion_etudiants/selection.php"
      )
      .then((response) => {
        setEtudiantList(response.data);
        setVisibility(false);
      })
      .catch((erreur) => {
        setVisibility(false);
        alert("Erreur durant la récupération des étudiants");
      });
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getEtudiants();
      console.log(authenticated);
    });
  }, [navigation]);

  const renderItem = (dataItem) => (
    <ItemList
      etudiant={dataItem}
      navigation={navigation}
      refresh={getEtudiants}
    />
  );

  if (authenticated.isAdmin)
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          name="Dashboard"
          nom={authenticated.nom}
          prenom={authenticated.prenom}
          navigation={navigation}
        />
        <View style={styles.admin_etd_add}>
          <TextInput
            style={styles.input}
            onChangeText={async (txt) => {
              setSearch_txt(txt);
              if (txt.length > 0) {
                setEtudiantList(
                  etudiantList.filter((val) => val.cne.match(txt))
                );
              } else getEtudiants();
            }}
            value={search_txt}
            placeholder="Rechercher par CNE"
          />
          <Icon
            size={35}
            color="white"
            onPress={() => {
              navigation.navigate("Form");
            }}
            style={{ fontSize: 30 }}
            name="add-circle"
          />
        </View>

        <StatusBar />
        <FlatList
          data={etudiantList}
          renderItem={(i) => renderItem(i.item)}
          keyExtractor={(item) => item.cne}
        />
        <LoadingDialog visible={visible} />
      </View>
    );
  else
    return (
      <View style={{ flex: 1, height: "100%", alignItems: "center" }}>
        <CustomHeader
          name="Dashboard"
          nom={authenticated.nom}
          prenom={authenticated.prenom}
          navigation={navigation}
        />

        <Image
          style={{ width: 100, height: 100, margin: 30 }}
          source={{
            uri: "https://w7.pngwing.com/pngs/671/944/png-transparent-student-cartoon-estudante-college-college-student-avatar-child-face-heroes.png",
          }}
        />

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/cne_white.png")}
          />
          <Text style={styles.inputText}>{authenticated.cne}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/name_white.png")}
          />
          <Text style={styles.inputText}>{authenticated.nom}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/name_white.png")}
          />
          <Text style={styles.inputText}>{authenticated.prenom}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/phone_white.png")}
          />
          <Text style={styles.inputText}>{authenticated.phone}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/email_white.png")}
          />
          <Text style={styles.inputText}>{authenticated.email}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/pass_white.png")}
          />
          <Text style={styles.inputText}>{authenticated.password}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  admin_etd_add: {
    marginTop: -2,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22A7F0",
  },
  input: {
    backgroundColor: "white",
    height: 44,
    marginRight: 12,
    fontSize: 16,
    width: "85%",
    borderRadius: 15,
    padding: 10,
  },

  background: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },

  inputText: {
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    fontSize: 21,
    width: "70%",
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
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
  },
});
