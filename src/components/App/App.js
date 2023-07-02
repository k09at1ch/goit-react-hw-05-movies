import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "../Home/Home";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieFinder from "../MovieFinder/MovieFinder";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/reviews" element={<MovieDetails />} />
        <Route path="/movies/:id/cast" element={<MovieDetails />} />
        <Route path="/moviefinder" element={<MovieFinder/>}/>
        <Route path="/moviefinder/:searchQuerry" element={<MovieFinder/>}/>
      </Routes>
    </div>
  );
}

export default App;