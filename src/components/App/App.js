import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "../Home/Home";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieFinder from "../MovieFinder/MovieFinder";
const apiKey = '21e5477607431763e3c03abefe43c027';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  function fetchMovies() {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home movies={movies}></Home>} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/moviefinder" element={<MovieFinder/>}/>
      </Routes>
    </div>
  );
}

export default App;