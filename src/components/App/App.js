import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../Home/Home"));
const MovieDetails = lazy(() => import("../MovieDetails/MovieDetails"));
const MovieFinder = lazy(() => import("../MovieFinder/MovieFinder"));

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetails />
            </Suspense>
          }
        >
          <Route path="reviews" element={<MovieDetails />} />
          <Route path="cast" element={<MovieDetails />} />
        </Route>
        <Route
          path="/moviefinder"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieFinder />
            </Suspense>
          }
        />
        <Route
          path="/moviefinder/:searchQuery"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieFinder />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
