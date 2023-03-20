import React, { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Watchlistcard from './Watchlistcard'
import Loader from '../Loader'

export default function Watchlist() {
    const [userInfo ,setUserInfo]=useState({})
    const [watchlist ,setWatchlist]=useState([])
    const [removeState , setRemoveState]= useState(false);
    const[loadingStateW , setLoadingStateW] = React.useState(false);

    useEffect(()=>{
        axios
        .get(`https://api.themoviedb.org/3/account?api_key=0a62a91a7346c3452d52fcfbebc81be2&session_id=${Cookies.get('session_id')}`)
        .then((response) => {
            setUserInfo(response.data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    },[])
  
    useEffect(()=>{
        setLoadingStateW(true)
        axios
        .get(`https://api.themoviedb.org/3/account/${userInfo.id}/watchlist/movies?api_key=0a62a91a7346c3452d52fcfbebc81be2&language=en-US&session_id=${Cookies.get('session_id')}&sort_by=created_at.asc&page=1`)
        .then((response) => {
            setWatchlist(response.data.results)
            setLoadingStateW(false)
        })
        .catch((err) => {
            console.log(err.message)
            setLoadingStateW(false)
        })
    },[userInfo.id , removeState])
   
    // eslint-disable-next-line
    const watchListCards = watchlist.map(function (movie) {
        if(movie.poster_path != null){

            return <Watchlistcard
            key={movie.id}
            id={movie.id}
            movie={movie}
            poster_path={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            release_date={movie.release_date}
            removeState={removeState}
            setRemoveState={setRemoveState}
            userInfo={userInfo}
        />
        }
    })

    // console.log(watchlist)
    return (
        <>
            <div className='containerWatchlist'>
                <div className='grid-container'>
                    <div className='grid-item watchlistHeader'>
                        <h1>WatchList</h1>
                        <h4 style={{fontSize:'1rem' , alignSelf:'flex-start'}}>Username: {userInfo.username}</h4>
                        <h4 style={{fontSize:'1rem' , alignSelf:'flex-start'}}>Number of movies:  {watchListCards.length}</h4>
                    </div>
                    <div className='grid-item'>
                    {loadingStateW? <Loader /> : watchListCards}
                    </div>
                </div>
            </div>
        </>

    )
}
