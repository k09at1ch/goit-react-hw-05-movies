import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header'
const apiKey = '21e5477607431763e3c03abefe43c027';

function MovieFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  let searchValue=''
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
    searchValue=event.target.value
    console.log(searchValue)
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return;
    }

    setIsLoading(true);
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
  };

  return (
    <div>
      <Header/>
      <div>
        <input type="text" value={searchQuery} onChange={handleSearchInputChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      {showResults && (
        <div>
          {isLoading ? (
            <div>Loading search results...</div>
          ) : searchResults.length === 0 ? (
            <p>Sorry, no movies were found.</p>
          ) : (
            <ul>
              {searchResults.map(movie => (
                <li key={movie.id}>
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
