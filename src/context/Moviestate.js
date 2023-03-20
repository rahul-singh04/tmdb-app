import React from 'react'
import { useSearchParams } from 'react-router-dom';
import Moviecontext from './Moviecontext'

export default function Moviestate(props){
    const [moviesArr, setMoviesArr] = React.useState([])
    const [searchParams, setSearchParams] = useSearchParams({movieSet : 1});
    // console.log(searchParams.get('movieSet'));
    const movieSet =  Number(searchParams.get('movieSet'))
    //api calls
    React.useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0a62a91a7346c3452d52fcfbebc81be2&language=en-US&page=${movieSet}`)
            .then(response => response.json())
            .then((data) => {
                setMoviesArr(data.results)
            })
            .catch((err) => console.log(err.message))
    }, [movieSet]);

    return(
       <Moviecontext.Provider value={{moviesArr , setMoviesArr ,movieSet,searchParams , setSearchParams}}>
        {props.children}
       </Moviecontext.Provider>
    )

}