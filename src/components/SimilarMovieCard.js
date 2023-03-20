import React from 'react'
import { Link } from 'react-router-dom'

export default function SimilarMovieCard(props) {
    return (
        <>
            <div className='similarMovieCard'>
                <div className="card-body">
                    <Link to={`/search/${props.id}`} style={{ textDecoration: 'none' }} >
                        <img src={`https://image.tmdb.org/t/p/original${props.posterPath}`} className="card-img-top card-img-css" alt="Poster Not Found"></img>
                    </Link>
                </div>
            </div>
        </>
    )
}