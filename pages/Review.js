import { StatusBar } from "expo-status-bar";
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

export default function Review({ navigation }) {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#411465", flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Description")}
            >
              <Image source={require("../images/back.png")} />
            </TouchableOpacity>
            <View>
              <Text style={styles.HeaderText}>Reviews</Text>
              <Text style={{ color: "#fff" }}>2500 Reviews</Text>
            </View>
          </View>
          <View style={styles.reviewscont}>
            <View style={styles.reviewInput}>
              <Image
                style={{ width: 40, height: 40, resizeMode: "contain" }}
                source={require("../images/user.png")}
              />
              <TextInput placeholder="Leave a review" />
            </View>
            <View style={styles.eachReview}>
              <View style={styles.review}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View>
                    <Image
                      style={styles.image}
                      source={require("../images/ene.png")}
                    />
                  </View>

                  <View>
                    <Text style={{ fontWeight: 600 }}> Ene Joe</Text>
                    <Text>2 days ago</Text>
                  </View>
                </View>
                <View style={styles.genre}>
                  <Text
                    style={{ color: "#411465", fontSize: 12, fontWeight: 500 }}
                  >
                    4.5
                  </Text>
                  <Image source={require("../images/star.png")} />
                </View>
              </View>
              <Text style={{ fontSize: 13 }}>
                It's not everyday you read a rom-com written by a guy, following
                the pov of a guy. it was so beautiful, i loved the dual timeline
                and the character developments are amazing. i adored all the
                film references, even if i didn't get all of them; i adored
                every character and how not a single one of them was boring or
                similar.
              </Text>
            </View>
            <View style={styles.eachReview}>
              <View style={styles.review}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View>
                    <Image
                      style={styles.image}
                      source={require("../images/joe.png")}
                    />
                  </View>
                  <View>
                    <Text style={{ fontWeight: 600 }}>Joe Doe</Text>
                    <Text>5 days ago</Text>
                  </View>
                </View>
                <View style={styles.genre}>
                  <Text
                    style={{ color: "#411465", fontSize: 12, fontWeight: 500 }}
                  >
                    4.5
                  </Text>
                  <Image source={require("../images/star.png")} />
                </View>
              </View>
              <Text style={{ fontSize: 13, padding: 0 }}>
                The cover for this book is just adorable. When I read the
                synopsis and editorial reviews, I was really excited to check it
                out.
              </Text>
            </View>
            <View style={styles.eachReview}>
              <View style={styles.review}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View>
                    <Image
                      style={styles.image}
                      source={require("../images/jane.png")}
                    />
                  </View>
                  <View>
                    <Text style={{ fontWeight: 600 }}>Jane John</Text>
                    <Text>1 week ago</Text>
                  </View>
                </View>
                <View style={styles.genre}>
                  <Text
                    style={{ color: "#411465", fontSize: 12, fontWeight: 500 }}
                  >
                    4.5
                  </Text>
                  <Image source={require("../images/star.png")} />
                </View>
              </View>
              <Text style={{ fontSize: 13 }}>
                Love, Unscripted is a rom-com, but is from the voice of a man. I
                found that super cool and was excited to try this one. I just
                didn't like the constant back and forth between "now" and
                "then".
              </Text>
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
  HeaderText: {
    // fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 600,
    color: "#fff",
  },
  reviewscont: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  smallText: {
    fontSize: 16,
    paddingTop: 5,
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  eachReview: {
    paddingVertical: 13,
  },
  reviewInput: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    paddingVertical: 18,
    paddingHorizontal: 15,
    gap: 18,
    borderWidth: 1,
    borderColor: "#411465",
    borderRadius: 8,
    justifyContent: "flex-start",
  },
  welcome: {
    flexDirection: "row",
    backgroundColor: "#411465",
    alignItems: "center",
    paddingVertical: 38,
    paddingHorizontal: 25,
    gap: 20,
    color: "#fff",
    width: "100%",
    justifyContent: "flex-start",
  },
  genre: {
    flexDirection: "row",
    alignItems: "center",
    color: "#411465",
    backgroundColor: "#D9D0E0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
});
