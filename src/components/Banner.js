import React from 'react'
import Carousel from 'react-bootstrap/Carousel';


export default function Banner(props) {
    const movieArray = props.moviesArr.slice(14,20)
    // console.log(movieArray)
    const[index , setIndex] = React.useState(0);
    function handleSelect(selectedIndex){
        setIndex(selectedIndex);
    }
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {movieArray.map((slide, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img
                                className="d-block w-100"
                                src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                                alt="slider"
                                style={{maxHeight:"80vh" }}
                            />
                            <Carousel.Caption>
                                <h3 className='banner-textContent'>{ slide.original_title}</h3>
                                <p className='banner-textContent'>{slide.overview.length > 140 ? slide.overview.substring(0, 141) + "..." :slide.overview}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}

            </Carousel>
        </>
    )
}