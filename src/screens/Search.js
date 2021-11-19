import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import Post from '../components/Post'

