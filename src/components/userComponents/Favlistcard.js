import axios from 'axios'
import React from 'react'
import Cookies from 'js-cookie'

export default function Favlistcard(props) {
    function changeState() {
        props.setRemoveStateFav((prevState) => !prevState)
    }

    function remFromFavlist() {
        const body =  {
            "media_type": "movie",
            "media_id": props.id,
            "favorite": false
          }   
            
        axios
            .post(`https://api.themoviedb.org/3/account/${props.userInfoFav.id}/favorite?api_key=0a62a91a7346c3452d52fcfbebc81be2&session_id=${Cookies.get('session_id')}`, body)
            .then(response => {
                changeState()
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function addToWatchlist() {
        const body = {
            "media_type": "movie",
            "media_id": props.id,
            "watchlist": true
        }
        axios
            .post(`https://api.themoviedb.org/3/account/${props.userInfoFav.id}/watchlist?api_key=0a62a91a7346c3452d52fcfbebc81be2&session_id=${Cookies.get('session_id')}`, body)
            .then(response => {
                changeState()
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <>
            <div className='watchlist_movie'>
                <div className='watchList_image'>
                    <img src={`https://image.tmdb.org/t/p/original${props.poster_path}`} className="" alt="Poster Not Found"></img>
                </div>
                <div className='watchList_info'>
                    <span className='watchListMovieTitle'>{props.title}</span>
                    <span className='watchlistReleaseDate' style={{ color: '#a6a6a6' }}>Release Date: {props.release_date}</span>
                    <span className='watchListOverview'>{(props.overview.length)< 300 ?props.overview :`${props.overview.substr(0,300)}.....`}</span>
                    <div className='watchlistIcons'>
                        <i class="fa-regular fa-circle-xmark fa-lg " onClick={remFromFavlist}></i>
                        <span style={{ fontWeight: 'bold', fontSize:'0.9rem' }}>Remove</span>
                    </div>
                    <div className='watchlistIcons watchlistIcon'>
                    <i class="fa-regular fa-bookmark fa-lg" onClick={addToWatchlist}></i>
                        <span style={{ fontWeight: 'bold', fontSize:'0.9rem' }}>Add to Watchlist</span>
                    </div>
                    
                </div>

            </div>
        </>
    )
}
