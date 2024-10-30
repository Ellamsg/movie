import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Casts from "./Casts";


import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";



export default function Loading() {

  return (
    <View>
        <Text>loading screen</Text>
    </View>
  );
}

