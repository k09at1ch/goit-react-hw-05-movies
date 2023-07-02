import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const apiKey = '21e5477607431763e3c03abefe43c027';
function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovies();
  }, []);

  function fetchMovies() {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      
        <Header/>
    <h1>Popular Movies</h1>
      <ul>
        
      {movies.map((movie) => (
  <li key={movie.id}>
    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
  </li>
))}

      </ul>
    </div>
  );
}

export default Home;