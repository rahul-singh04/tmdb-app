import React from 'react';
const genreObj = {
    "genres": [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]
}
let onPageGenreArr = ['All Genres'];



export default function FavPage() {

    const [state, setState] = React.useState(JSON.parse(localStorage.getItem('favMovies')) || [])
    React.useEffect(() => {
        localStorage.setItem('favMovies', JSON.stringify(state))
    }, [state])

    function deleteFn(event) {
        const deletedId = Number(event.target.id)
        const newState = state.filter((movie) => {
            return movie.id !== deletedId
        })
        setState(newState)
        deleteFromLeftPane(deletedId)
    }

    function deleteFromLeftPane(deletedId) {
        // console.log(onPageGenreArr)
        let genreIdA
        for (let i = 0; i < state.length; i++) {
            let movie = state[i]
            if (movie.id === deletedId) {
                genreIdA = movie.genre_ids[0];
            }
        }
        const genreArr = genreObj.genres;
        let name
        for (let i = 0; i < genreArr.length; i++) {
            if (genreArr[i].id === genreIdA) {
                name = genreArr[i].name
            }
        }
        const index = onPageGenreArr.indexOf(name);
        if (index > -1) { // only splice array when item is found
            onPageGenreArr.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
    const [selectedGenre, setSelectedGenre] = React.useState(onPageGenreArr[0])
    function handleSelGenre(event) {
        const genre = event.target.innerHTML;
        setSelectedGenre(genre);
    }
    //state for search bar 
    const [search, setSearch] = React.useState('')
    function handleSearch(event) {
        setSearch(event.target.value)
    }

    //displaying movies on the right pane
    const rowItemArr = state.map((movie, index) => {
        if (selectedGenre === getGenre(movie.genre_ids[0])) {
            let title = movie.original_title.toLowerCase()
            if (search.length !== 0 && title.includes(search)) {
                // console.log(search)
                return getMovieRowItem(movie, index)
            }
            else if (search.length === 0) {
                return getMovieRowItem(movie, index)
            } else {
                return ''
            }

        }
        else if (selectedGenre === 'All Genres') {
            let title = movie.original_title.toLowerCase()
            if (search.length !== 0 && title.includes(search)) {
                // console.log(search)
                return getMovieRowItem(movie, index)
            }
            else if (search.length === 0) {
                return getMovieRowItem(movie, index)
            } else {
                return ''
            }
        } else {
            return ''
        }
    })

    function getMovieRowItem(movie, index) {
        return (
            <tr key={index}>
                <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="rowImage" alt="..."></img>{movie.original_title}</th>
                <td>{getGenre(movie.genre_ids[0])}</td>
                <td>{movie.popularity}</td>
                <td>{movie.vote_average}</td>
                <td><button type="button" className="btn btn-secondary" id={movie.id} onClick={deleteFn}>Delete</button></td>
            </tr>

        )
    }




    //matches genre from the genre obj on top of this component
    function getGenre(idee) {
        const genreArr = genreObj.genres;
        for (let i = 0; i < genreArr.length; i++) {
            let elem = genreArr[i];
            if (elem.id === idee) {
                if (onPageGenreArr.includes(elem.name)) {
                } else {
                    onPageGenreArr.push(elem.name)
                }
                return elem.name;
            }
        }

    }

    function displayGenres(onPageGenreArr) {
        const dispArr = onPageGenreArr.map((elem, index) => {
            if (elem === selectedGenre) {
                return <li className="list-group-item" key={index} style={{ background: "#110c0cf6", color: 'white', fontweight: 'bold', border: '1px solid red' }} onClick={handleSelGenre}>{elem}</li>
            } else {
                return <li className="list-group-item" key={index} style={{ background: 'white', color: "#110c0cf6" }} onClick={handleSelGenre}>{elem}</li>
            }
        })
        return dispArr
    }
    function sortUpPop(){
        let tempArr = state;
        tempArr.sort((a, b) => a.popularity - b.popularity);
        setState([...tempArr])
    }
    function sortDownPop(){
        let tempArr = state;
        tempArr.sort((a, b) => b.popularity - a.popularity);
        setState([...tempArr])
    }
    function sortUpRating(){
        let tempArr = state;
        tempArr.sort((a, b) => a.vote_average - b.vote_average);
        setState([...tempArr])
    }
    function sortDownRating(){
        let tempArr = state;
        tempArr.sort((a, b) => b.vote_average - a.vote_average);
        setState([...tempArr])
    }
    return (
        <>
            <div className='fav-page'>
                <div className='row'>
                    <div className='col-3 genre-list'>
                        <ul className="list-group">
                            {displayGenres(onPageGenreArr)}
                        </ul>
                    </div>
                    <div className='col'>
                        <div className='row'>
                            <input className='input-group-text col' placeholder='Search' onChange={handleSearch} type='text' />
                            <input className='input-group-text col' placeholder='Number' type='number' />
                        </div>
                        <div className='row'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fa-solid fa-arrow-up sortIcon" onClick={sortUpPop} />Popularity<i className="fa-solid fa-arrow-down sortIcon" onClick={sortDownPop} /></th>
                                        <th scope="col"><i className="fa-solid fa-arrow-up sortIcon" onClick={sortUpRating} />Rating<i className="fa-solid fa-arrow-down sortIcon" onClick={sortDownRating} /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rowItemArr}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}