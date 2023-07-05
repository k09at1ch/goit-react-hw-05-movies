import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './MovieDetail.module.css';
import Header from 'components/Header/Header';
import { querryExporter } from 'components/Pages/MovieFinder/MovieFinder';
import { selected } from 'components/Header/Header';
const apiKey = '21e5477607431763e3c03abefe43c027';
const baseImageUrl = 'https://image.tmdb.org/t/p/';

function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoadingCast, setIsLoadingCast] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showCast, setShowCast] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const fetchMovieDetails = useCallback(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  function fetchCast() {
    setIsLoadingCast(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
      .then(response => {
        setCast(response.data.cast);
        setIsLoadingCast(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoadingCast(false);
      });
  }

  function fetchReviews() {
    setIsLoadingReviews(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`)
      .then(response => {
        setReviews(response.data.results);
        setIsLoadingReviews(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoadingReviews(false);
      });
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleShowCast = () => {
    setShowCast(true);
    setShowReviews(false);
    fetchCast();
    navigate(`/movies/${id}/cast`);
  };

  const handleShowReviews = () => {
    setShowCast(false);
    setShowReviews(true);
    fetchReviews();
    navigate(`/movies/${id}/reviews`);
    console.log(querryExporter);
  };

  const handleGoBack = () => {
    if (selected === 'home') {
      navigate('/');
    }
    if (selected === 'moviefinder') {
      navigate(`/movies?query=${querryExporter}`);
    }
  };

  return (
    <div>
      <Header />
      <button onClick={handleGoBack}>←Go back</button>
      <h1>
        {movie.title} ({movie.release_date.slice(0, 4)})
      </h1>
      <div className={style.div}>
        <aside>
          <img
            src={`${baseImageUrl}w500/${movie.poster_path}`}
            alt={movie.title}
            className={style.img}
          />
        </aside>
        <div>
          <h2>User score: {parseFloat(movie.vote_average * 10).toFixed(1)}%</h2>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>
            {movie.genres.map(genre => {
              return <span key={genre.id}> {genre.name} </span>;
            })}
          </p>
        </div>
      </div>
      <div>
        <h2>
          <Link to={`/movies/${id}/cast`} onClick={handleShowCast}>
            Cast
          </Link>
        </h2>
        <h2>
          <Link to={`/movies/${id}/reviews`} onClick={handleShowReviews}>
            Reviews
          </Link>
        </h2>
      </div>
      {showCast && (
        <div>
          {isLoadingCast ? (
            <div>Loading cast...</div>
          ) : (
            <ul>
              {cast.map(actor => (
                <li key={actor.id}>
                  {actor.profile_path && (
                    <img
                      src={`${baseImageUrl}w200/${actor.profile_path}`}
                      alt={actor.name}
                    />
                  )}
                  <p>{actor.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {showReviews && (
        <div>
          {isLoadingReviews ? (
            <div>Loading reviews...</div>
          ) : (
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <h3>{review.author}</h3>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieDetails;