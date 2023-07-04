import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import style from './MovieFinder.module.css';
import MovieList from 'components/movieList/movieList';
import Header from 'components/Header/Header';

const apiKey = '21e5477607431763e3c03abefe43c027';
export let querryExporter;

function MovieFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  querryExporter = searchQuery;

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
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

    navigate(`/moviefinder?query=${searchQuery}`);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    setSearchQuery(query);

    const handleSearchByPageRender = () => {
      setIsLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
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

    if (query) {
      handleSearchByPageRender();
    }
  }, [location.search]);

  return (
    <div>
      <Header />
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSearch();
        }}
        className={style.form}
      >
        <input type="text" value={searchQuery} onChange={handleSearchInputChange} className={style.input} />
        <button type="submit" className={style.button}>
          Search
        </button>
      </form>

      {showResults && (
        <div>
          {isLoading ? (
            <div>Loading search results...</div>
          ) : searchResults.length === 0 ? (
            <p>Sorry, no movies were found.</p>
          ) : (
            <MovieList searchResults={searchResults} />
          )}
        </div>
      )}
    </div>
  );
}

export default MovieFinder;
