import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  FlatList,
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
import { CartContext } from "../CartContext";
import { AuthContext } from "../authContext";
import { books } from "../Books.js";
import Toast from "react-native-root-toast";
import { ToastContainer } from "react-native-toast-message";
import { useState, useContext, useCallback, useEffect } from "react";
import { auth } from "../firebase";

export default function Home({ navigation }) {
  // using usecontext
// const [username, setUsername] = useState("");
  const {
    cartItems,
    setcartItems,
    addtoCart,
    bookList,
    showToast,
    setLiked,
    favItems,
    setfavItems,
    addtoFav,
  } = useContext(CartContext);

  const { username, setUsername, handleLogin } = useContext(AuthContext);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <View>
              <Text style={styles.HeaderText}>Hello {username}</Text>
              <Text style={styles.smallText}>Welcome back</Text>
            </View>
            <Image source={require("../images/notification.png")} />
          </View>
          <View style={[styles.welcome]}>
            <Text style={{ fontWeight: 600 }}> Recommended</Text>
            <View style={styles.genre}>
              <Text style={{ color: "#411465", fontSize: 12, fontWeight: 500 }}>
                All genres
              </Text>
              <Image source={require("../images/drop-down.png")} />
            </View>
          </View>
          <ScrollView>
            <View style={styles.booksContainer}>
              {bookList?.map((book, index) => {
                return (
                  <View style={[styles.book, styles.shadowProp]} key={book.id}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Description")}
                    >
                      <Image source={book.image} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 500, paddingTop: 5 }}>
                      {book.title}
                    </Text>
                    <Text style={{ fontStyle: "italic", color: "#696969" }}>
                      {book.author}
                    </Text>
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
                      {/* {liked === book.id ? (
                        <TouchableOpacity
                          onPress={() => {
                            addtoFav(book);
                             handleLike(book.id);
                            // setLiked(book.id);
                            // setLiked([...liked, !book.id]);
                          }}
                        >
                          <FontAwesome
                            value={book.id}
                            name={"heart"}
                            // name={liked === book.id ? "heart" : "heart-o"}
                            size={18}
                            color={"#d10000"}
                            // color={liked === book.id ? "#d10000" : "#979797"}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            addtoFav(book);
                            handleLike(book.id);
                          }}
                        >
                          <FontAwesome
                            // name={liked === book.id ? "heart" : "heart-o"}
                            name={"heart-o"}
                            size={18}
                            // color={liked === book.id ? "#d10000" : "#979797"}
                            color={"#979797"}
                          />
                        </TouchableOpacity>
                      )} */}
                      <TouchableOpacity
                        onPress={() => {
                          addtoFav(book);
                          // setLiked([...liked, book.id]);
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
                        paddingVertical: 4,
                        marginTop: 5,
                      }}
                    >
                      <Text style={styles.price}>${book.price.toFixed(2)}</Text>
                      <View>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={["#806298", "#411465", "#806298"]}
                          style={styles.button}
                        >
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                              addtoCart(book), showToast(book);
                            }}
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
                );
              })}
            </View>
          </ScrollView>
          {/* <FlatList
            data={books}
            renderItem={({ book }) => (
              <Books title={book.title} id={book.id} author={book.author} image={book.image} price={book.price} />
            )}
          /> */}

          <View style={styles.tab}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ padding: 6, gap: 3, alignItems: "center" }}
            >
              <Octicons name="home" size={20} color="#411465" />
              <Text style={styles.HomeText}>Home</Text>
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
    paddingHorizontal: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
  },
  booksContainer: {
    flexDirection: "row",
    // alignItems: "center",
    paddingVertical: 15,
    flexWrap: "wrap",
    columnGap: 6,
    rowGap: 16,
    justifyContent: "center",
  },
  book: {
    flexDirection: "column",
    // alignItems: "center",
    gap: 5,
    justifyContent: "center",
    padding: 10,
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
    paddingTop: 12,
    borderRadiusTopRight: 10,
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
