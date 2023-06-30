import React from "react";
import { Link } from "react-router-dom";
function Home({ movies }) {
  return (
    <div>
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
