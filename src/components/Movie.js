import React, { useContext } from 'react'
import Moviecontext from '../context/Moviecontext'
import { useParams } from 'react-router-dom';
import SimilarMovieCard from './SimilarMovieCard';

export default function Movie() {
    const obj = useContext(Moviecontext)
    const contextMoviesArr = obj.moviesArr;

    let { movieId } = useParams();
    let movie = {};
    movie = contextMoviesArr.find((elem) => {
        return elem.id === Number(movieId)
    })

    const [similarMovies, setSimilarMovies] = React.useState([]);
    React.useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=0a62a91a7346c3452d52fcfbebc81be2&language=en-US&page=1`)
            .then(response => response.json())
            .then((data) => {
                setSimilarMovies(data.results.splice(0, 4))
            })
            .catch((err) => console.log(err.message))
    }, [movieId])
    // console.log(similarMovies)
    const similarMoviesArr = similarMovies.map((movie) => {
        return (
            <SimilarMovieCard 
            posterPath= {movie.poster_path}
            title={movie.title}
            id={movie.id}
            />
        )
    })

    if (typeof movie === 'undefined') {
        return (
            <div>Loading</div>
        )
    }
    else {
        return (
            <div className='indMoviePage'>
                <div className='indivMovieCard'>
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="img" alt="..."></img>
                    <div className='movie-info'>
                        <p style={{ fontWeight: 'bold' }}>{movie && movie.title}</p>
                        <p className='overview'>{movie && movie.overview}</p>
                        <div className='popularity' >
                            <p style={{ marginBottom: '0.2px' }}>Popularity</p>
                            <p className='overview'> {movie && movie.popularity}</p>
                        </div>
                        <div className='releaseDate'>
                            <p style={{ marginBottom: '0.2px' }}>Release Date </p>
                            <p className='overview'>{movie && movie.release_date}</p>
                        </div>
                        <div className='similarMovies'>
                            <p style={{ marginTop: '12px' }}>Similar Movies </p>
                        </div>
                    </div>
                </div>
                
                <div className='similarMoviesContainer'>
                    {similarMoviesArr}
                </div>

                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="backdropPoster" alt="..."></img>
            </div>

        )
    }

}