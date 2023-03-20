import React from 'react'
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';



export default function Card(props) {
    const array = props.overview.split(".")
    const [display, setDisplay] = React.useState(false);
    function handleMouseEnter() {
        setDisplay(!display)
    }
    function handleMouseLeave() {
        setDisplay(!display)
    }

    //favOrNOTLOGIC
    const [favButtonState, setFavButtonState] = React.useState(JSON.parse(localStorage.getItem('favOrNot')) || true);

    function changeState() {
        console.log('triggered ')
        setFavButtonState((prevState) => !prevState)
    }
    React.useEffect(() => {

        localStorage.setItem('favOrNot', JSON.stringify(favButtonState))
    }, [favButtonState])

    const [searchParams] = useSearchParams({ movieSet: 1 });
    return (
        <>

            {props.title === '' ? <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
                <div className="card card-custom-css" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={`https://image.tmdb.org/t/p/original${props.poster_path}`} className="card-img-top card-img-css" alt="Poster Not Found"></img>
                    <div className="card-body">

                        <Link to={`${props.id}/?movieSet=${searchParams.get('movieSet')}`} style={{ textDecoration: 'none' }} >{<h5 className="card-title">{props.title}</h5>}</Link>
                        <p className="card-text">{(array[0].length < 20) ? array[0] + array[1] + '.' : array[0] + '.'}</p>
                        {display && props.addToFav && (favButtonState ?
                            <button className="btn btn-outline-primary btn-sm card-button" id={props.id} onClick={() => {
                                props.addToFav(props.movie)
                                changeState()
                            }}>Add to Fav</button>
                            : <button className="btn btn-primary btn-sm card-button" id={props.id}>Favourite</button>)
                        }
                    </div>
                </div>
            }
        </>
    )
}