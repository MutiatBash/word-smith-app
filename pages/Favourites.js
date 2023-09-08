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
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { books } from "../Books.js";
import { CartContext } from "../CartContext.js";
import { useState, useContext, useCallback, useEffect } from "react";

export default function Favourites({ navigation }) {
  const {
    favItems,
    cartItems,
    setfavItems,
    addtoCart,
    addtoFav,
    removeFavAlert,
    clearFavAlert,
  } = useContext(CartContext);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <View>
              <Text style={styles.HeaderText}>Favourites</Text>
            </View>
            <TouchableOpacity onPress={() => clearFavAlert()}>
              <Text
                style={{
                  fontWeight: 500,
                  color: "#d10000",
                }}
              >
                Clear favourites
              </Text>
            </TouchableOpacity>
          </View>

          {favItems.length === 0 ? (
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    gap: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <FontAwesome name="heart-o" size={100} color="#D9D0E0" />

                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ fontSize: 22, fontWeight: 500 }}>
                      Your Wishlist is Empty
                    </Text>
                    <Text> You haven't added any item yet</Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          ) : (
            <ScrollView>
              <View style={styles.booksContainer}>
                {favItems?.map((book, index) => {
                  return (
                    <View
                      style={[styles.book, styles.shadowProp]}
                      key={book.id}
                    >
                      <View>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Review")}
                        >
                          <Image
                            source={book.image}
                            style={{
                              width: 80,
                              height: 90,
                              resizeMode: "contain",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: "70%" }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <View>
                            <Text style={{ fontWeight: 500, paddingTop: 5 }}>
                              {book.title}
                            </Text>
                            <Text
                              style={{
                                fontStyle: "italic",
                                color: "#696969",
                              }}
                            >
                              {book.author}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              // addtoFav(book);
                              removeFavAlert(book)
                              // handleLike(book.id);
                            }}
                          >
                            <FontAwesome
                              name={book.isLiked ? "heart" : "heart-o"}
                              size={18}
                              color={book.isLiked ? "#d10000" : "#979797"}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            style={{ width: 80, resizeMode: "contain" }}
                            source={require("../images/ratings.png")}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingVertical: 5,
                          }}
                        >
                          <Text style={styles.price}>${book.price}</Text>
                          <View>
                            <LinearGradient
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              colors={["#806298", "#411465", "#806298"]}
                              style={styles.button}
                            >
                              <TouchableOpacity
                                style={styles.button}
                                onPress={() => addtoCart(book)}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "#fff",
                                  }}
                                >
                                  Add to cart
                                </Text>
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}

          <View style={styles.tab}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ padding: 6, gap: 3, alignItems: "center" }}
            >
              <Octicons name="home" size={20} color="#aeaeae" />
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={{ padding: 6, gap: 3 }}
            >
              <View style={{ position: "relative" }}>
                <AntDesign name="shoppingcart" size={25} color="#aeaeae" />
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: -8,
                    backgroundColor: "#411465",
                    borderRadius: "100%",
                    // width:17,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 12,
                    }}
                  >
                    {cartItems.length}
                  </Text>
                </View>
              </View>
              <Text>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Favourites")}
              style={{ padding: 6, gap: 3, alignItems: "center" }}
            >
              <FontAwesome name="heart-o" size={20} color="#411465" />
              <Text style={styles.HomeText}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 6, gap: 3, alignItems: "center" }}
            >
              <Ionicons name="ios-person-outline" size={22} color="#979797" />
              <Text>Profile</Text>
            </TouchableOpacity>
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
  //   safeview: {
  //     paddingTop: 10,
  //     backgroundColor: "#fff",
  //     alignItems: "center",
  //     height: "100%",
  //   },
  HeaderText: {
    // fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 600,
  },
  smallText: {
    fontSize: 16,
    paddingTop: 5,
  },
  buttoncontainer: {
    width: "90%",
    borderRadius: 8,
    marginTop: 45,
    fontSize: 6,
  },
  button: {
    display: "flex",
    textAlign: "center",
    borderRadius: 8,
    paddingVertical: 6,
    fontSize: 6,
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  },
  booksContainer: {
    flexDirection: "row",
    // alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexWrap: "wrap",
    columnGap: 6,
    rowGap: 16,
    justifyContent: "center",
  },
  book: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    // justifyContent: "space-between",
    // padding: 10,
    border: "none",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: "#696969",
    shadowOffset: { width: 0.5, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 6,
  },
  welcome: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 25,
    gap: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  tab: {
    // position: "absolute",
    // zIndex: 1,
    // bottom: 0,
    // left: 0,
    // right: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  HomeText: {
    color: "#411465",
    fontWeight: 600,
  },
  genre: {
    flexDirection: "row",
    alignItems: "center",
    color: "#411465",
    backgroundColor: "#D9D0E0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
