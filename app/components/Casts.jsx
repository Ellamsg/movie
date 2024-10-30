import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "@/api/moviedb";

export default function Casts({ cast, navigation }) {
  const personName = "keanu reaves";
  const characterName = "John wick";

  const navigations = useNavigation();
  return (
    <View style={{ backgroundColor: "#121212",}}>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          paddingVertical: 20,
          fontSize: 20,
        }}
      >
        Cast
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                style={{
                  paddingRight: 20,
                  paddingVertical: 20,
                  color: "black",
                }}
                key={index}
                onPress={() =>
                  navigations.navigate("screens/PersonScreen", person)
                }
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    style={{ borderRadius: "50%", width: 100, height: 100 }}
                    source={{
                      uri: image185(person?.profile_path),
                    }}
                  />
                  <Text style={{ color: "white" }}>
                    {person?.original_name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
