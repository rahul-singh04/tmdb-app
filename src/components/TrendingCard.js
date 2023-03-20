import React from 'react'
import { Link } from 'react-router-dom'

export default function TrendingCard(props) {
   
    return (
        
            <div className='trendingMovieCard'>
                    <Link to={`/search/${props.item.id}`} style={{ textDecoration: 'none' }} >
                        <img src={`https://image.tmdb.org/t/p/original${props.item.poster_path}`} className="card-img-top card-img-css" alt="Poster Not Found"></img>
                    </Link>
            </div>
        
    )
}