import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Alert,
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
import CheckBox from "expo-checkbox";
import { AuthContext } from "../authContext.js";
import { LinearGradient } from "expo-linear-gradient";
import { FIREBASE_AUTH } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useCallback, useEffect } from "react";
// import * as

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading, username, setUsername, error, setError } =
    useContext(AuthContext);

  const auth = FIREBASE_AUTH;
  const handleSignup = async () => {
    if (!email.trim() || !password.trim() || !username.trim()) {
      setError("All fields are required");
    } else {
      setError("");
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.navigate("Login");
      console.log("registered:", email);
    //   alert("Account has been created ");
      setLoading(true);
    } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Error",
          "Email is already in use. Please use a different email."
        );
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      }
      console.log(error.message);
      //   alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Text>Creating user</Text> : null}
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../images/logo.png")} />
          <Text style={styles.HeaderText}>WELCOME TO WORDSMITH</Text>
          <Text style={{ color: "#411465", paddingVertical: 12, fontSize: 16 }}>
            Sign up to get started
          </Text>
          <View style={styles.form}>
            <View>
              <Text style={{ paddingVertical: 2 }}>Username</Text>
              <TextInput
                inputMode="text"
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View>
              <Text style={{ paddingVertical: 2 }}>Email Address</Text>
              <TextInput
                inputMode="email"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View>
              <Text style={{ paddingVertical: 2 }}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <Text style={{ color: "#dc143c", fontSize: 13 }}>{error}</Text>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#806298", "#411465", "#806298"]}
            style={styles.buttoncontainer}
          >
            <TouchableOpacity style={styles.button}>
              <Button title="Sign up" color="#fff" onPress={handleSignup} />
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.Signupcontainer}>
            <Text> Or Continue With</Text>
            <TouchableOpacity>
              <Image source={require("../images/google.png")} />
            </TouchableOpacity>
            <View style={styles.forgotcontainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.SignupText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar style="auto" />
        </View>
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
  checkbox: {
    width: 16,
    height: 16,
  },
  search: {
    alignSelf: "flex-end",
    width: 50,
    height: 50,
    paddingRight: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: "100%",
    // alignSelf: "center",
  },
  HeaderText: {
    color: "#411465",
    textAlign: "center",
    // fontFamily: "Inter",
    fontSize: 21,
    fontWeight: 600,
    letterSpacing: -0.025,
    paddingVertical: 3,
  },
  logo: {
    marginVertical: 5,
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  buttoncontainer: {
    width: "90%",
    borderRadius: 8,
    marginBottom: 18,
    marginTop: 25,
    fontSize: 6,
  },
  button: {
    display: "flex",
    // backgroundColor: "#411465",
    // background: radial-gradient("387.30%" "66.49%" at "42.68%" "-0.00%," "#411465" "0%", "#806298" "100%"),
    textAlign: "center",
    borderRadius: 8,
    paddingVertical: 7,
    fontSize: 6,
    paddingHorizontal: 30,
  },
  form: {
    flexDirection: "column",
    // alignItems: "center",
    width: "90%",
    paddingVertical: 20,
    gap: 15,
    justifyContent: "space-between",
  },
  forgotcontainer: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  Signupcontainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    // width: 300,
    justifyContent: "space-between",
  },
  forgotText: {
    color: "#411465",
  },
  SignupText: {
    color: "#411465",
    fontWeight: 600,
    textDecorationLine: "underline",
  },
  whiteText: {
    alignSelf: "center",
    color: "#fff",
  },
  bodyText: {
    fontSize: 13,
    alignSelf: "center",
  },
  subHeadText: {
    fontSize: 15,
    // textAlign: "center",
    fontWeight: "bold",
  },
});
