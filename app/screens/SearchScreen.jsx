import React, { useEffect, useState, useCallback,useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import debounce from "debounce";
import { searchMovies, image500 } from "@/api/moviedb";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [results, setResults] = useState([]);

  // Hide header on this screen
  
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const handleSearch = (value) => {
    if (value && value.length > 2) {
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        if (data && data.results) setResults(data.results);
      });
    } else {
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView  style={{ backgroundColor: "#121212",}}>
        
      
    <ScrollView >
   
      <View style={{ backgroundColor: "#121212",padding:20 }}>
   
   
      <View>
      
        <Text
          style={{
            color: "white",
            fontSize: 20,
            paddingVertical: 20,
            fontWeight: "bold",
          }}
        >
          Find Movies, TV series, and more...
        </Text>
        <TextInput
          onChangeText={handleTextDebounce}
          style={{
            backgroundColor: "#2B2826",
            height: 50,
            borderRadius: 20,
            width: "100%",
            color: "white",
            padding: 10,
          }}
          placeholder="Search..."
          placeholderTextColor="gray"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingVertical:50,
            justifyContent: "space-between",
          }}
        >
          {results.length > 0 ? (
            results.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "48%",
                  marginBottom: 10,
                  backgroundColor: "#1c1c1c",
                  borderRadius: 8,
                }}
                onPress={() => router.push({ pathname: "screens/MovieScreen", params: item })}
              >
                <View>
                  <Text style={{ color: "white", marginBottom: 5 }}>
                    {item?.original_title}
                  </Text>
                  <Image
                    style={{ width: "100%", height: 190, borderRadius: 8 }}
                    source={{ uri: image500(item?.poster_path) }}
                  />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Image
                style={{ width: 400, height: 400 }}
                source={require('../../assets/images/removr.png')}
              />
            </View>
          )}
        </View>
      </ScrollView>
 
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
