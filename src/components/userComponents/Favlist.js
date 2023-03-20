import React, { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Favlistcard from './Favlistcard'
import Loader from '../Loader'

export default function Favlist(props) {
    const [userInfoFav ,setUserInfoFav]=useState({})
    const [favlist ,setFavlist]=useState([])
    const [removeStateFav , setRemoveStateFav]= useState(false);
    const[loadingStateF , setLoadingStateF] = useState(false);


    useEffect(()=>{
        axios
        .get(`https://api.themoviedb.org/3/account?api_key=0a62a91a7346c3452d52fcfbebc81be2&session_id=${Cookies.get('session_id')}`)
        .then((response) => {
            setUserInfoFav(response.data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    },[])
    useEffect(()=>{
        setLoadingStateF(true)
        axios
        .get(`https://api.themoviedb.org/3/account/${userInfoFav.id}/favorite/movies?api_key=0a62a91a7346c3452d52fcfbebc81be2&session_id=${Cookies.get('session_id')}&language=en-US&sort_by=created_at.asc&page=1`)
        .then((response) => {
            setFavlist(response.data.results)
            setLoadingStateF(false)
        })
        .catch((err) => {
            console.log(err.message)
            setLoadingStateF(false)
        })
    },[userInfoFav , removeStateFav])
   
    // eslint-disable-next-line
    const favListCards = favlist.map(function (movie) {
        if(movie.poster_path != null){

            return <Favlistcard
            key={movie.id}
            id={movie.id}
            movie={movie}
            poster_path={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            release_date={movie.release_date}
            removeStateFav={removeStateFav}
            setRemoveStateFav={setRemoveStateFav}
            userInfoFav={userInfoFav}
        />
        }
    })

    // console.log(favlist)
    //CSS used same as watchlist one
    return (
        <>
            <div className='containerWatchlist'>
                <div className='grid-container'>
                    <div className='grid-item watchlistHeader'>
                        <h1>Favourite List</h1>
                        <h4 style={{fontSize:'1rem' , alignSelf:'flex-start'}}>Username: {userInfoFav.username}</h4>
                        <h4 style={{fontSize:'1rem' , alignSelf:'flex-start'}}>Number of movies:  {favListCards.length}</h4>
                    </div>
                    <div className='grid-item'>
                        {loadingStateF? <Loader /> : favListCards}
                    </div>
                    

                </div>
            </div>
        </>

    )
}
