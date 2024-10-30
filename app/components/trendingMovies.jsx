import React from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate 
} from "react-native-reanimated";
import { image500 } from "@/api/moviedb";

const { width } = Dimensions.get("window");
// Make center item take up 60% of screen width
const ITEM_WIDTH = width * 0.6;
// Show 20% of side items (leaving 10% padding on outer edges)
const VISIBLE_SIDE_ITEM_WIDTH = width * 0.2;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH;
// Center items with proper spacing
const SIDE_SPACING = (width - ITEM_WIDTH) / 2;

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const scrollX = useSharedValue(0);

  const handleClick = (item) => {
    navigation.push("screens/MovieScreen", item);
  };

  const onScroll = (event) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const getItemLayout = (_, index) => ({
    length: TOTAL_ITEM_WIDTH,
    offset: TOTAL_ITEM_WIDTH * index,
    index,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Movies</Text>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <MovieCard 
            item={item} 
            handleClick={handleClick} 
            index={index} 
            scrollX={scrollX} 
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={TOTAL_ITEM_WIDTH}
        snapToAlignment="center"
        decelerationRate="fast"
        bounces={true}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
        getItemLayout={getItemLayout}
        initialScrollIndex={0}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick, index, scrollX }) => {
  const inputRange = [
    (index - 1) * TOTAL_ITEM_WIDTH,
    index * TOTAL_ITEM_WIDTH,
    (index + 1) * TOTAL_ITEM_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          inputRange,
          [0.8, 1, 0.8],
          Extrapolate.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    ),
    // This ensures side items are partially visible
    zIndex: interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Animated.View style={[styles.slide, animatedStyle]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: image500(item.poster_path),
            }}
          />
        </View>
        <Text style={styles.text} numberOfLines={1}>
          {item.title}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 15,
    fontWeight: "600",
  },
  flatListContent: {
    paddingHorizontal: SIDE_SPACING - VISIBLE_SIDE_ITEM_WIDTH,
  },
  slide: {
    width: TOTAL_ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    resizeMode: "cover",
    borderRadius: 16,
  },
  text: {
    fontSize: 22,
    color: "#fff",
    fontWeight:'bold',
    marginTop: 10,
    textAlign: "center",
    width: ITEM_WIDTH,
  }
});
