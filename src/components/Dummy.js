import React from 'react'
import { useParams } from "react-router-dom"
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
export default function Dummy(props) {
    const { movieID } = useParams()
    const [movies, setMovies] = React.useState([])

    React.useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0a62a91a7346c3452d52fcfbebc81be2&language=en-US&page=${props.page}`)
            .then(response => response.json())
            .then((data) => {
                setMovies(data.results)
            })
            .catch((err) => console.log(err.message))
    }, [props.page , movieID]);
    console.log(movies)
    console.log(Number(movieID))
    const movieOBJECT = movies.find((movie) => {
        if (movie.id === Number(movieID)) {
            return movie
        }
        return ''
    })

    return (

        <>
            <h2>DUMMY</h2>

            <h2>{movieOBJECT.title}</h2>

            <h2>{movieOBJECT.original_title}</h2>
            <h2>{movieOBJECT.overview}</h2>


        </>
    )
}