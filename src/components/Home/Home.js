import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import style from './Home.module.css'
const apiKey = '21e5477607431763e3c03abefe43c027';
function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovies();
  }, []);

  function fetchMovies() {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div >
      <Header />
      <div className={style.div}>
      <h1 className={style.title} >Popular Movies</h1>
      <ul className={style.movielist} >
        {movies.map(movie => (
          <li key={movie.id} className={style.movielistitem} >
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Home;
