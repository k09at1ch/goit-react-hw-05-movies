import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
function Home({ movies }) {
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