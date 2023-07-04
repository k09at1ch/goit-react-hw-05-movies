import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/notFound";

const Home = lazy(() => import("../Home/Home"));
const MovieDetails = lazy(() => import("../../MovieDetails/MovieDetails"));
const MovieFinder = lazy(() => import("../MovieFinder/MovieFinder"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />}>
            <Route path="reviews" element={<MovieDetails />} />
            <Route path="cast" element={<MovieDetails />} />
          </Route>
          <Route path="/moviefinder" element={<MovieFinder />} />
          <Route path="/moviefinder/:searchQuery" element={<MovieFinder />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
