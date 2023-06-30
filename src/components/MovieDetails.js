import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiKey = '21e5477607431763e3c03abefe43c027';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  function fetchMovieDetails() {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title} ({movie.release_date.slice(0, 4)})</h1>

      <p>User score: {parseFloat(movie.vote_average * 10).toFixed(1)}%</p>

    <h2>Overview</h2>
      <p>{movie.overview}</p>
      {/* Додайте іншу інформацію про фільм, як вам потрібно */}
    </div>
  );
}

export default MovieDetails;
