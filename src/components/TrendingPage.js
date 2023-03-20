import React, { useContext } from 'react'
import Card from './Card'
import Banner from './Banner'
import Pagination from './Pagination'
import Moviecontext from '../context/Moviecontext'



export default function TrendingPage() {

    //context Api 
    const context = useContext(Moviecontext);
    const moviesArr = context.moviesArr
    const movieSet = context.movieSet
    const setSearchParams = context.setSearchParams

    function removedSpaces(str) {
        return str.split(" ").join("-");
    }
    const moviesCards = moviesArr.map(function (movie) {
        return <Card
            key={movie.id}
            id={movie.id}
            movie={movie}
            poster_path={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            addToFav={addToFav}
            str={removedSpaces(movie.title)}
        />
    })


    //add to fav implementation
    let [fav, setFav] = React.useState(JSON.parse(localStorage.getItem('favMovies')) || [])

    // console.log('search ' + movieSet)

    function addToFav(movieObj) {
        const bool = JSON.parse(localStorage.getItem('favMovies')).some((obj) => { return obj.id === movieObj.id && obj.original_title === movieObj.original_title })
        setFav((prevState) => {
            if (bool) {
                return [...prevState]
            } else {
                return [...prevState, movieObj]
            }
        })
    }
    //  console.log(fav)
    React.useEffect(() => {
        localStorage.setItem('favMovies', JSON.stringify(fav))
    }, [fav])

    return (
        <>
            <div className='banner'>
                <Banner moviesArr={moviesArr} />
            </div>
            <div className='moviesCardContainer'>
                {moviesCards}
            </div>
            <Pagination movieSet={movieSet} setSearchParams={setSearchParams} />

        </>
    )
}