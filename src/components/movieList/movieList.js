import React from 'react';
import { Link } from 'react-router-dom';
import style from './movieList.module.css';

const MovieList = ({ searchResults }) => {
  return (
    <ul className={style.movielist}>
      {searchResults.map(movie => (
        <li key={movie.id} className={style.movielistitem}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
