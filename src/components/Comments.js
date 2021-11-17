import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { createNativeWrapper } from "react-native-gesture-handler";