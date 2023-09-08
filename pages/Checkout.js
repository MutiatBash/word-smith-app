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
  Modal,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { books } from "../Books.js";
import { CartContext } from "../CartContext.js";
import { useState, useContext, useCallback, useEffect, useRef } from "react";

export default function Checkout({ navigation }) {
  const {
    cartItems,
    setcartItems,
    loading,
    setLoading,
    success,
    setSuccess,
    clearCart,
    cartTotal,
  } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  const handlePay = () => {
    setShowModal(!showModal);
    setLoading(!loading);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate("Home");
      }, 3500);
    }, 3000);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <View>
              <Text style={styles.HeaderText}>Checkout</Text>
            </View>
            <TouchableOpacity
              //   style={styles.button}
              onPress={() => navigation.navigate("Cart")}
            >
              <Text
                style={{
                  fontWeight: 500,
                }}
              >
                Back to cart
              </Text>
            </TouchableOpacity>
          </View>

          {/* PAYMENT METHOD */}
          <View
            style={{ width: "100%", paddingHorizontal: 20, gap: 15, flex: 1 }}
          >
            <Text style={{ fontSize: 14, fontWeight: 500, paddingVertical: 6 }}>
              Select your payment method
            </Text>
            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={[styles.quantity, styles.card]}>
                  <Text style={[styles.quantity, styles.card]}>Card</Text>
                </View>
                <View style={styles.quantity}>
                  <Text style={styles.quantity}>Paypal</Text>
                </View>
                <View style={styles.quantity}>
                  <Text style={styles.quantity}>Bank</Text>
                </View>
              </View>
              {/* <ScrollView> */}
              <View style={styles.form}>
                <View>
                  <Text style={{ paddingVertical: 4 }}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="**** **** **** ****"
                  />
                </View>
                <View>
                  <Text style={{ paddingVertical: 4 }}>Card Holder</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Jane Doe"
                    inputMode="text"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <Text style={{ paddingVertical: 4 }}>Valid Until</Text>
                    <TextInput style={[styles.input]} placeholder="mm/yy" />
                  </View>
                  <View style={{ width: "35%" }}>
                    <Text style={{ paddingVertical: 4 }}>CVV</Text>
                    <TextInput style={styles.input} placeholder="***" />
                  </View>
                </View>
              </View>
              {/* </ScrollView> */}
            </View>
          </View>

          {/* ORDER SUMMARY */}
          <View style={{ width: "100%", padding: 20, gap: 15 }}>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#aeaeae",
                marginVertical: 4,
              }}
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
                  onPress={() => {
                    handlePay();
                    setcartItems([]);
                  }}
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
                    Pay Now
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          {/* MODAL */}
          {showModal && (
            <View
              style={{
                flex: 1,
                position: "absolute",
                zIndex: 1,
                top: 0,
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animated.View
                style={[styles.modal, { transform: [{ scale: scaleValue }] }]}
              >
                {loading ? (
                  <View style={styles.loader}>
                    {/* <AntDesign name="loading1" size={25} color="#411465" /> */}
                    <ActivityIndicator size="large" color="#411465" />
                    <Text style={styles.HeaderText}>Processing payment</Text>
                    <Text>Please be patient...</Text>
                  </View>
                ) : success ? (
                  <View>
                    {/* <TouchableOpacity
                      onPress={() => {
                        setShowModal(!showModal);
                      }}
                      style={{ alignSelf: "flex-end" }}
                    >
                      <Ionicons name="close" size={24} color="#808080" />
                    </TouchableOpacity> */}
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={120}
                        color="#411465"
                      />
                      <Text style={styles.HeaderText}>Payment successful</Text>
                      <Text> Directing to home page...</Text>
                    </View>
                  </View>
                ) : (
                  <Text>An error was encountered</Text>
                )}
              </Animated.View>
            </View>
          )}

          {/* BOTTOM TAB   */}

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
  modal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 5,
    gap: 10,
    zIndex: 1,
    position: "absolute",
    height: 300,
    marginHorizontal: "auto",
    bottom: "50%",
    top: "30%",
    width: "80%",
    borderRadius: 16,
    elevation: 10,
  },
  loader: {
    alignItems: "center",
    flex: 1,
    gap: 10,
    justifyContent: "center",
    flexDirection: "column",
  },
  HeaderText: {
    fontSize: 22,
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
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 13,
    // width: "100%",
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
  form: {
    flexDirection: "column",
    width: "100%",
    paddingVertical: 14,
    gap: 15,
    justifyContent: "space-between",
  },
  HomeText: {
    color: "#411465",
    fontWeight: 600,
  },
  quantity: {
    backgroundColor: "#f5f5f5",
    // backgroundColor: "#e4e5e8",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  card: {
    color: "#411465",
    backgroundColor: "#D9D0E0",
    fontWeight: 500,
  },
});
