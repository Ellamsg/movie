import axios from "axios";
import { apiKey } from "@/constants/Colors";

//endpoints

const apiBaseUrl = 'https://api.themoviedb.org/3'

 const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
 const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
  const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
   const searchMovieEndpoints =   `${apiBaseUrl}/search/movie?api_key=${apiKey}`
   
  const movieDetailsEndpoints =id =>  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
  const movieCreditEndPoints =id =>  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
 const similarMoviesEndpoints =id =>  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
  const personDetailsEndpoints =id =>  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
  const personMovieEndpoints =id =>  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


  export const image500 = path => path? `https://image.tmdb.org/t/p/w500${path}`: null

  export const image342 = path => path? `https://image.tmdb.org/t/p/w342${path}`: null

  export const image185 = path => path? `https://image.tmdb.org/t/p/w185${path}`: null

  const apiCall = async (endpoint, params) =>{

     const options = {
        method:'GET',
        url: endpoint,
        params: params?params:{}
     }

     try{
       const response =await axios.request(options);
       return response.data

     }catch(error){

        console.log('error message',error)
     }

  }


  export const fetchTrendingMovies = () =>{
    return apiCall(trendingMoviesEndpoint)

    
  }

  export const fetchUpcomingMovies = () =>{
    return apiCall(upComingMoviesEndpoint)
   

    
  }

  export const fetchTopratedMovies = () =>{
    return apiCall(topRatedMoviesEndpoint)
   

    
  }
  export const fetchMoviesDetails = id =>{
    return apiCall(movieDetailsEndpoints(id))
  
  }

  export const fetcMoviesCredit = id =>{
    return apiCall(movieCreditEndPoints(id))
  
  }
  export const fetchSimilarMovies = id =>{
    return apiCall(similarMoviesEndpoints(id))
  
  }
  export const fetchPersonDetails = id =>{
    return apiCall(personDetailsEndpoints(id))
  
  }

  export const fetchPersonMovies = id =>{
    return apiCall(personMovieEndpoints(id))
  
  }

  export const searchMovies = params =>{
    return apiCall(searchMovieEndpoints,params)
  
  }