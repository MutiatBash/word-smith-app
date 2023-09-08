import { StatusBar } from "expo-status-bar";
// import { Button } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Button,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useContext, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Description({ navigation }) {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#411465", flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
              <Image source={require("../images/back.png")} />
            </TouchableOpacity>
            <Image source={require("../images/heart-outline.png")} />
          </View>
          <View style={styles.love}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.image}
                source={require("../images/book2.png")}
              />
            </View>

            <View>
              <Text style={styles.HeaderText}>Love Unscripted</Text>
              <Text style={styles.smallText}>Owen Nicholls</Text>
            </View>
          </View>
          <View style={styles.description}>
            <View style={styles.descriptioncon}>
              <Text style={styles.descriptionText}>Description</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Review")}>
                <Text>Reviews</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={{ paddingVertical: 25 }}>
                Owen Nicholls’ Love, Unscripted follows film projectionist Nick
                as he tries to understand the difference between love on the
                silver screen and love in real life. Perfect for fans of
                rom-coms, David Nicholls and Nick Hornby. For film projectionist
                Nick, love should mirror what he sees on the big screen. ...
              </Text>
              <View style={{marginBottom:30}}><LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#806298", "#411465", "#806298"]}
                style={styles.button}
              >
                <TouchableOpacity style={styles.button}>
                  <Text style={{fontSize:14, color:"#fff"}}>Reserve</Text>
                </TouchableOpacity>
              </LinearGradient></View>
            
            </View>
            <Text style={{ fontWeight: 600 }}>Similar Books</Text>
            <View style={styles.booksContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Description")}
              >
                <View style={styles.book}>
                  <Image source={require("../images/book1.png")} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Description")}
              >
                <View style={styles.book}>
                  <Image source={require("../images/book2.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  loader: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  safeview: {
    paddingTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
  },
  description: {
    paddingVertical: 10,
    paddingHorizontal: 23,
    backgroundColor: "#fff",
    height: "100%",
    borderTopLeftRadius: 25,
    Width: "100%",
  },
  HeaderText: {
    // fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 600,
    color: "#fff",
  },
  smallText: {
    fontSize: 16,
    paddingTop: 5,
    color: "#fff",
  },
  booksContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
    justifyContent: "center",
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    borderRadius: 5,
  },
  imagecontainer: {
    width: "30%",
  },
  book: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  welcome: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  love: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 33,
    width: "100%",
    // justifyContent: "space-between",
  },
  descriptioncon: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    // paddingHorizontal: 25,
    gap: 60,
    width: "100%",
    justifyContent: "flex-start",
  },
  descriptionText: {
    color: "#411465",
    fontWeight: 500,
  },
  button: {
    display: "flex",
    textAlign: "center",
    color: "#fff",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 3,
  },
});
