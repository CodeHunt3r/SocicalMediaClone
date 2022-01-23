import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const db = getFirestore();
    const auth = getAuth();
    const { email, password, name } = this.state;
    createUserWithEmailAndPassword(auth, email, password).try(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setDoc(doc(db, "users", uid), {
            name,
            email,
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}
