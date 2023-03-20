import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function UserInfo(props) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    // console.log(Cookies.get('session_id'))
    useEffect(() => {
                axios
                    .get(`https://api.themoviedb.org/3/account?api_key=0a62a91a7346c3452d52fcfbebc81be2&session_id=${Cookies.get('session_id')}`)
                    .then((response) => {
                    setUserData(response.data)

                    })
        
        //eslint-disable-next-line
    }, [props.loggedIn ])

    function handleLogOut() {
        let sessionID = Cookies.get('session_id')
        axios.delete('https://api.themoviedb.org/3/authentication/session?api_key=0a62a91a7346c3452d52fcfbebc81be2', {
            data: {
                session_id : `${sessionID}`,
            }
        })
            .then(response => {
                // console.log(response);
                document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                props.setLoggedIn(false);
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            });
    }
    function showWatchlist(){
        navigate(`/watchlist/${userData.id}`)
    }

    function showFavlist(){
        navigate(`/favlist/${userData.id}`)
    }
    

    return (
        <div className="dropdown">

            <button type="button" className="dropbtn userInfoBtn" >U</button>
            <div className="dropdown-content">
                <li>{`${userData.username}(${userData.id})`}</li>
                <li onClick={showWatchlist}>WatchList</li>
                <li onClick={showFavlist}>Favourites</li>
                <li onClick={handleLogOut}>Log Out</li>
            </div>
        </div>
    )
}





