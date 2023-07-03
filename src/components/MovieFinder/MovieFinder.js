import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import style from './MovieFinder.module.css'

const apiKey = '21e5477607431763e3c03abefe43c027';
export let querryExporter
function MovieFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  querryExporter=searchQuery
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    setIsLoading(true);
    if (searchQuery.trim() === '') {
      return;
    }

    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`)
      .then(response => {
        setSearchResults(response.data.results);
        setIsLoading(false);
        setShowResults(true);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        setShowResults(true);
      });

    navigate(`/moviefinder/${searchQuery}`);
  };

  useEffect(() => {
    if (params.searchQuery) {
      setSearchQuery(params.searchQuery);
      handleSearchByPageRender();
    }
  }, [params.searchQuery]);

const handleSearchByPageRender = () => {
  setIsLoading(true);
  axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${params.searchQuery}`)
    .then(response => {
      setSearchResults(response.data.results);
      setIsLoading(false);
      setShowResults(true);
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
      setShowResults(true);
    });
};
  return (
    <div>
      <Header />
      <form onSubmit={handleSearch} className={style.form} >
        <input type="text" value={searchQuery} onChange={handleSearchInputChange} className={style.input} />
        <button type="submit" className={style.button} >Search</button>
      </form>

      {showResults && (
        <div>
          {isLoading ? (
            <div>Loading search results...</div>
          ) : searchResults.length === 0 ? (
            <p>Sorry, no movies were found.</p>
          ) : (
            <ul className={style.movielist} >
              {searchResults.map(movie => (
                <li key={movie.id} className={style.movielistitem} >
                  <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieFinder;
