import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "https://moviegraph-rqbn.onrender.com/api";

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
});

export async function getMovies() {
  const response = await api.get("/movies/");
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await api.get("/movies/search/", {
    params: { q: query },
  });
  console.log("search",response.data);
  
  return response.data.results;
}

export async function getMovie(movieId) {
  const response = await api.get(`/movies/${movieId}/`);
  console.log("single movie",response.data);
  
  return response.data.movie;
}

// export async function getMovieRecommendations(movieId) {
//   const response = await api.get(`/movies/${movieId}/recommendations/`);
//   console.log("recommendataions",response.data);
  
//   return response.data;
// }


export async function getMovieRecommendations(movieId) {
  const response = await api.get(`/movies/${movieId}/recommendations/`);

  console.log("RECOMMENDATION RAW RESPONSE:", response.data);
  console.log("RECOMMENDATION IS ARRAY:", Array.isArray(response.data));
  console.log("MOVIE ID USED:", movieId);

  return response.data.results;
}

export default api;
