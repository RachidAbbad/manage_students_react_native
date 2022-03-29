import React from "react";
import {
  Alert,
  Animated,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import axios from "axios";
import { Avatar, Icon } from "react-native-elements";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";

export default function ItemList({ etudiant, navigation, refresh }) {
  const renderRightActions = (row) => {
    return (
      <SafeAreaView>
        <View style={styles.swipedRow}>
          <Animated.View style={[styles.deleteButton, {}]}>
            <View style={styles.btn_grp}>
              <View style={{ marginRight: 10 }}>
                <Button
                  title="Update"
                  onPress={() => {
                    navigation.navigate("Form", { row });
                  }}
                />
              </View>
              <View>
                <Button
                  title="Delete"
                  color={"red"}
                  onPress={() => {
                    showConfirmDialog(row.cne);
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  };

  const showConfirmDialog = (cne) => {
    return Alert.alert(
      "Attention",
      "Voulez-vous vraiment supprimer cet étudiant?",
      [
        {
          text: "Oui",
          onPress: () => {
            axios
              .get(
                `https://iot-nodemcu-projects.000webhostapp.com/gestion_etudiants/suppression.php?cne=${cne}`
              )
              .then(() => {
                refresh();
              })
              .catch((err) => {
                alert("Erreur durant la suppression!!");
              });
          },
        },
        {
          text: "Non",
        },
      ]
    );
  };

  return (
    <Swipeable renderRightActions={() => renderRightActions(etudiant)}>
      <View style={styles.mainView}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: "https://w7.pngwing.com/pngs/671/944/png-transparent-student-cartoon-estudante-college-college-student-avatar-child-face-heroes.png",
          }}
        />

        <View style={styles.row}>
          <Text style={{ fontSize: 17 }}>
            {etudiant.nom} {etudiant.prenom}
          </Text>
          <Text>CNE : {etudiant.cne}</Text>
          <Text>Email : {etudiant.email}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "column",
    flex: 1,
    paddingLeft: 10,
    backgroundColor: "white",
    margin: 5,
    minHeight: 50,
    borderRadius: 15,
  },
  swipedRow: {
    flexDirection: "row",
    paddingLeft: 5,
    height: "100%",
  },
  btn_grp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },

  deleteButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
