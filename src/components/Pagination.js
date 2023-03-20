import React from 'react'


export default function Pagination(props) {
  
   

  function handleNext(){
    props.setSearchParams({movieSet : ( props.movieSet + 1)})
  }
  function handlePrev(){
    if(props.movieSet >1){
      props.setSearchParams({movieSet : ( props.movieSet - 1)})
    }
    
  }
  function handleExact(event){
    const val = Number(event.target.innerHTML)
    props.setSearchParams({movieSet : val})
  }


    const buttonArr =[]
    for(let i =1 ; i<= props.movieSet ;i++){
        buttonArr.push(<li  key= {i} className="page-item"><button className="page-link"  onClick={handleExact}>{i}</button></li>)
    }

    const newArr=[];
    function lenthMoreThanTen(){
        for(let i =1 ; i<= 10 ;i++){
            newArr.push(<li  key= {i} className="page-item"><button className="page-link"  onClick={handleExact}>{i}</button></li>)
        }
        newArr.push(<li  key= {11} className="page-item"><button className="page-link"  onClick={()=>{handleExact()}}>...</button></li>)
        return newArr;
    }
  
    return (
        
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={handlePrev}>Previous</button></li>
                    {buttonArr.length <=10 ? buttonArr : lenthMoreThanTen()}
                    <li className="page-item"><button className="page-link"  onClick={()=>{handleNext()}}>Next</button></li>
                </ul>
            </nav>
        </>
    )
}