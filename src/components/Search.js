import React from 'react'
import Card from './Card';
import Loader from './Loader';
import Nomoviefound from './Nomoviefound';


export default function Search() {

    const [searchBar, setSearchBar] = React.useState();
    const [searchedMovies, setsearchedMovies] = React.useState([]);
    const[searchButton , setSearchButton] = React.useState(false);
    const[loadingState , setLoadingState] = React.useState(false);
    const[movieNotFound , setMovieNotFound] = React.useState(false);

    function handleSearch(event) {
        setSearchBar(event.target.value.toLowerCase())
    }
    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    React.useEffect(() => {
        setLoadingState(true)
        const getData = setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a62a91a7346c3452d52fcfbebc81be2&language=en-US&query=${searchBar}&page=1&include_adult=true`)
            .then(response => response.json())
            .then((data) => {
                if(data.results.length === 0){
                    setMovieNotFound(true)
                }
                    setsearchedMovies(data.results)
                    setLoadingState(false);
                   
                    
                })
                .catch((err) => {
                    console.log(err.message)
                    setLoadingState(false);
                }
                )
        }, 2000)
    
        return () => {
            clearTimeout(getData)
            setMovieNotFound(false)
        }
      }, [searchBar , searchButton])

    function handleClick(){
       setSearchButton(true);
    }

     // eslint-disable-next-line
    const moviesCards = searchedMovies.map(function (movie) {
        if(movie.poster_path != null){
            return <Card
            key={movie.id}
            id={movie.id}
            movie={movie}
            poster_path={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
        />
        }
       
    })
    // console.log(moviesCards)

    return (
        <div className='search-page-container'>
            <div className='searchBox'>
                <input className="searchInput" type="search" name="q" placeholder="Search" onChange={handleSearch} />
                <button className="searchButton" type="submit" onClick={handleClick}>
                    <i className="material-icons"> search</i>
                </button>
            </div>
            <div className='moviesCardContainer displaysearchedImages'>
                
                {loadingState? <Loader /> :searchBar && moviesCards}
                {searchBar && movieNotFound ? <Nomoviefound/> : ''}
                
            </div>

        </div>
    )
}