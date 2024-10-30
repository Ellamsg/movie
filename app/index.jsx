import React, { useState ,useLayoutEffect } from "react";

import { StatusBar, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import TrendingMovies from "./components/trendingMovies";
import MovieList from "./components/MovieList";
import Loading from "./components/Loading";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import {
  fetchUpcomingMovies,
  fetchTrendingMovies,
  fetchTopratedMovies,
} from "@/api/moviedb";
import { useNavigation } from "@react-navigation/native";



export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [trending, setTrending] = useState();
  const [upcoming, setUpcoming] = useState();
  const [topRated, setTopRated] = useState();
  const [loading, setLoading] = useState(true);


  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopratedMovies();
  }, []);

  const getTrendingMovies = async () => {
   
    const data = await fetchTrendingMovies();

    if (data && data.results) setTrending(data.results);
    setLoading(false);
    //console.log("trending is ", data.results)
  };

  const getTopratedMovies = async () => {
    const data = await fetchTopratedMovies();

    if (data && data.results) setTopRated(data.results);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();

    if (data && data.results) setUpcoming(data.results);
  };

  return (

    <View style={{ backgroundColor: "#121212",padding:20 ,paddingBottom:80}}>
      <SafeAreaView>
       
        <StatusBar />

        <View style={{ display: "flex",
           justifyContent:"space-between",
           alignItems:"center",
          flexDirection:"row" }}>
          <Image
          style={{width:50,height:50}}
          
        source={require('../assets/images/logg.png')}
      />   
          <TouchableOpacity  onPress={() => router.push({ pathname: "screens/SearchScreen" })}>
          <Image
          style={{width:40,height:40}}
          
        source={require('../assets/images/search3.png')}
      />   
          </TouchableOpacity>
      
     
        
        </View>
      </SafeAreaView>
      {/**display trending movies */}

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieList title="upcoming" data={upcoming} />
          <MovieList title="Toprated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}



