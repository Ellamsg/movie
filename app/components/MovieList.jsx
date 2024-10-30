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

import { useNavigation } from "@react-navigation/native";

import { image185 } from "@/api/moviedb";
const { width, height } = Dimensions.get("window");

export default function MovieList({ data = [], title, hideSeeAll }) {
  const navigation = useNavigation();
  const movieName = "olodo";

  return (
    <View>
      <View
        style={{
          backgroundColor: "#121212",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            paddingVertical: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {title}
        </Text>

      
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                navigation.push("screens/MovieScreen", { id: item.id })
              }
            >
              <View style={{ marginRight: 10, backgroundColor: "#121212", }}>
                <Image
                  style={{
                    borderRadius: 10,
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  source={{
                    uri: image185(item.poster_path),
                  }}
                />
                <Text style={{ color: "white",paddingTop:10 }}>
                  {" "}
                  {item.title.length > 20
                    ? `${item.title.substring(0, 10)}...`
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </ScrollView>
    </View>
  );
}


