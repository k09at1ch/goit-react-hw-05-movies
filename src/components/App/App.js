import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../Pages/notFound/notFound';

const Home = lazy(() => import('../Pages/Home/Home'));
const MovieDetails = lazy(() => import('../Pages/MovieDetails/MovieDetails'));
const MovieFinder = lazy(() => import('../Pages/MovieFinder/MovieFinder'));
function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieFinder/>}/>
          <Route path="/movie/:searchQuery" element={<MovieFinder/>}/>
          <Route path="/movies/:id" element={<MovieDetails />}>
            <Route path="reviews" element={<MovieDetails />} />
            <Route path="cast" element={<MovieDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
