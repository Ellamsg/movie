import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Casts from "../components/Casts";
import {
  fetchMoviesDetails,
  fetcMoviesCredit,
  fetchSimilarMovies,
} from "@/api/moviedb";
import { useRoute, useNavigation } from "@react-navigation/native";
import { image500 } from "@/api/moviedb";
import MovieList from "../components/MovieList";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setsimilarMovies] = useState([]);

  // Hide header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredit(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMoviesDetails(id);
    if (data) setMovie(data);
  };

  const getMovieCredit = async (id) => {
    const data = await fetcMoviesCredit(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setsimilarMovies(data.results);
    }
  };

  return (
    <ScrollView>
      <View>
        <Image
          style={{ width: "100%", height: 500 }}
          source={{ uri: image500(movie?.poster_path) }}
        />
      </View>
      <View style={{ backgroundColor: "#121212", paddingHorizontal: 16 }}>
        <View>
          <Text
            style={{
              color: "white",
              paddingVertical: 10,
              paddingTop: 30,
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            {movie?.original_title}
          </Text>
          <View>
            <Text style={{ color: "white", paddingVertical: 10 }}>
              {movie?.runtime} minutes
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              marginVertical: 10,
              paddingVertical: 10,
              borderColor: "white",
              borderTopWidth: 0.3,
              borderBottomWidth: 0.3,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.title4}>Release date</Text>
              <Text style={styles.title5}>{movie?.release_date}</Text>
            </View>
            <View>
              <Text style={styles.title4}>Genre</Text>
              <Text style={styles.title5}>Action</Text>
            </View>
          </View>
        </View>
        {cast.length > 0 && <Casts navigation={navigation} cast={cast} />}
        <View style={{ paddingVertical: 30 }}>
          <Text style={styles.title4}>Synopsis</Text>
          <Text style={styles.title5}>{movie?.overview}</Text>
        </View>
        {similarMovies.length > 0 && (
          <MovieList title="similar movies" hideSeeAll={true} data={similarMovies} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title4: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  title5: {
    color: "white",
  },
});