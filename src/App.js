
import './App.css';
import {  Route, Routes  } from 'react-router-dom';
import NavBar from './components/Navbar';
import Homepage from './components/Homepage';
import FavPage from './components/FavPage';
import Movie from './components/Movie';
import React from 'react'
import Moviestate from './context/Moviestate';
import Search from './components/Search';
import Moviebyid from './components/Moviebyid'
import Watchlist from './components/userComponents/Watchlist';
import Favlist from './components/userComponents/Favlist';
import TrendingPage from './components/TrendingPage';

function App() {
  
  return (
    <>
      <Moviestate>
      <NavBar />
        <Routes>
        <Route path="/"  element={<Homepage />} />
        <Route path="/:"  />
        <Route path="/trending"  element={<TrendingPage />} />
        <Route path='/favourites' element={<FavPage />} />
        <Route path='/trending/:movieId' element={<Movie />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/search/:movieId' element={<Moviebyid />}/>
        <Route path='/watchlist/:userId'  element={<Watchlist/>}/>
        <Route path='/favlist/:userId'  element={<Favlist />}/>
        </Routes>
        </Moviestate>
    </>
  );
}

export default App;
