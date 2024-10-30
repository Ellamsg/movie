import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { image500 } from "@/api/moviedb";
import { fetchPersonDetails, fetchPersonMovies } from "@/api/moviedb";
import MovieList from "../components/MovieList";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [person, setPerson] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);

  // Hide header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#121212"}}>
        <Image
          style={{ width: "100%", height: 500 }}
          source={{ uri: image500(person?.profile_path) }}
        />
       
        <View>

       
        <View style={{paddingHorizontal:20,paddingBottom:50}}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            paddingVertical: 15,
          }}
        >
          {person?.name}
        </Text>
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {person?.place_of_birth}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              paddingTop: 10,
            }}
          >
            Birth: {person?.birthday}
          </Text>
          <Text style={{ color: "white", fontSize: 14, paddingVertical: 20 }}>
            {person?.biography}
          </Text>
          <MovieList title={"Movies"} data={personMovies} />
        </View>
     
      </View>
    
   
      </View>
    </ScrollView>
  );
}
