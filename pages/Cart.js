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

export default function Cart({ navigation }) {
  const {
    cartItems,
    setcartItems,
    totalItems,
    totalPrice,
    addtoCart,
    reducefromCart,
    deletefromCart,
    clearCartAlert,
    deleteCartAlert,
    cartTotal,
  } = useContext(CartContext);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <View>
              <Text style={styles.HeaderText}>Cart</Text>
            </View>
            <TouchableOpacity onPress={() => clearCartAlert()}>
              <Text
                style={{
                  fontWeight: 500,
                  color: "#d10000",
                }}
              >
                Clear cart
              </Text>
            </TouchableOpacity>
          </View>

          {/* empty cart display */}
          {cartItems.length === 0 ? (
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
                    gap: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      paddingVertical: 3,
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <AntDesign name="shoppingcart" size={150} color="#D9D0E0" />
                    <View
                      style={{
                        width: 75,
                        backgroundColor: "#efebf1",
                        borderRadius: 50,
                        marginLeft: 10,
                        padding: 3.5,
                        // borderBottomRightRadius: 50,
                        borderRadius: 50,
                        height: 1,
                      }}
                    ></View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ fontSize: 24, fontWeight: 500 }}>
                      Your Cart is Empty
                    </Text>
                    <Text>
                      You can check out the home page to explore 
                    </Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          ) : (
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
              <View style={styles.container}>
                <ScrollView>
                  <View style={styles.booksContainer}>
                    {cartItems.map((book, index) => {
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
                                <Text
                                  style={{ fontWeight: 500, paddingTop: 5 }}
                                >
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
                                onPress={() => deleteCartAlert(book)}
                              >
                                <AntDesign
                                  name="delete"
                                  size={18}
                                  color="black"
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

                              {/* increase or decrease quantity of books */}
                              <View style={styles.quantity}>
                                <TouchableOpacity
                                  onPress={() => reducefromCart(book)}
                                >
                                  <Text
                                    style={{ fontSize: 16, fontWeight: 700 }}
                                  >
                                    -
                                  </Text>
                                </TouchableOpacity>

                                <Text style={{ fontWeight: 600 }}>
                                  {book.quantity}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => addtoCart(book)}
                                >
                                  <Text
                                    style={{ fontSize: 16, fontWeight: 700 }}
                                  >
                                    +
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </SafeAreaView>
          )}

          {/* cart summary  */}
          {cartItems.length > 0 ? (
            <View style={{ width: "100%", padding: 20, gap: 15 }}>
              <View style={{ gap: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    Items Qty
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {totalItems()}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    Subtotal
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {totalPrice().toFixed(2)}
                  </Text>
                </View>
              </View>
              <View
                style={{ height: 1, width: "100%", backgroundColor: "#aeaeae" }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 700 }}>Total</Text>
                <Text style={{ fontSize: 20, fontWeight: 700 }}>
                  ${cartTotal().toFixed(2)}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#806298", "#411465", "#806298"]}
                  style={styles.button}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Checkout")}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        padding: 10,
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      Checkout
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          ) : (
            ""
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
                <AntDesign name="shoppingcart" size={25} color="#411465" />
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
              <Text style={styles.HomeText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Favourites")}
              style={{ padding: 6, gap: 3, alignItems: "center" }}
            >
              <FontAwesome name="heart-o" size={20} color="#979797" />
              <Text>Favourites</Text>
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
    fontSize: 6,
  },
  button: {
    display: "flex",
    textAlign: "center",
    borderRadius: 8,
    paddingVertical: 5,
    fontSize: 6,
    paddingHorizontal: 10,
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
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    color: "#411465",
    backgroundColor: "#D9D0E0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
