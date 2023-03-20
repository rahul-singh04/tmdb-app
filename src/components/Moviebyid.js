import React from 'react'
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import SimilarMovieCard from './SimilarMovieCard';
import Nomoviefound from './Nomoviefound';

export default function Movie() {

    const [moviebyId, setMovieById] = React.useState({})
    const [loadingState, setLoadingState] = React.useState(false);
    let { movieId } = useParams();
    // console.log(movieId)

    React.useEffect(() => {
        setLoadingState(true)
        fetch(`https://api.themoviedb.org/3/movie/${movieId}}?api_key=0a62a91a7346c3452d52fcfbebc81be2&language=en-US`)
            .then(response => response.json())
            .then((data) => {
                setMovieById(data)
                setLoadingState(false)
            })
            .catch((err) => console.log(err.message))
    }, [movieId])
    console.log(moviebyId)
    console.log(typeof moviebyId.backdrop_path)
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
    // eslint-disable-next-line
    const similarMoviesArr = similarMovies.map((movie) => {
        if (movie.poster_path != null) {
            return (
                <SimilarMovieCard
                    posterPath={movie.poster_path}
                    title={movie.title}
                    id={movie.id}
                />
            )
        }

    })

    if (loadingState) {
        return (
            <div className='movieByIdPage'>
                <Loader />
            </div>
        )
    } else {
        if (moviebyId.backdrop_path === null) {
            return (
                <div className='movieNotFoundContainer' >
                    <Nomoviefound />
                </div>
        )

        } else {
            return (
                <div className='indMoviePage'>
                    <div className='indivMovieCard'>
                        <img src={`https://image.tmdb.org/t/p/original${moviebyId.poster_path}`} className="img" alt="Poster Not Found"></img>
                        <div className='movie-info'>
                            <p style={{ fontWeight: 'bold' }}>{moviebyId && moviebyId.title}</p>
                            <p className='overview'>{moviebyId && moviebyId.overview}</p>
                            <div className='popularity' >
                                <p style={{ marginBottom: '0.2px' }}>Popularity</p>
                                <p className='overview'> {moviebyId && moviebyId.popularity}</p>
                            </div>
                            <div className='releaseDate'>
                                <p style={{ marginBottom: '0.2px' }}>Release Date </p>
                                <p className='overview'>{moviebyId && moviebyId.release_date}</p>
                            </div>
                            <div className='similarMovies'>
                                {similarMovies.length > 0 && <p style={{ marginTop: '12px' }}>Similar Movies </p>}
                            </div>

                        </div>
                    </div>
                    <div className='similarMoviesContainer'>
                        {similarMoviesArr}
                    </div>
                    <img src={`https://image.tmdb.org/t/p/original${moviebyId.backdrop_path}`} className="backdropPoster" alt="..."></img>
                </div>

            )
        }
    }

}
