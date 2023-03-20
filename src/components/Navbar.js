import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './logo.png'
import Loginmodal from './Modals/Loginmodal'
import { useState, useEffect } from 'react'
import UserInfo from './UserInfo'
import Cookies from 'js-cookie';


export default function NavBar() {

    const [loginModalState, setLoginModalState] = React.useState(false)

    const navStyleLink = ({ isActive }) => {
        return {
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? 'red' : 'white'
        }
    }

    const Login_ButtonStyle = {
        fontSize: '1rem',
        letterSpacing: '2px',
        fontFamily: `'Source Sans Pro', Arial, sans-serif`,
        marginRight: '1rem'
    }


    const [loggedIn, setLoggedIn] = useState(false)
    // console.log(loggedIn)

    const [sessionId1, setsessionId1] = useState(null);
    useEffect(() => {
        const storedSessionId = Cookies.get('session_id');
        if (storedSessionId) {
            setLoggedIn(true)
        }
    }, [])

    return (
        <>
            <div className='navbar-container'>
                <div className='logoAndHeader'>
                    <img style={{ height: '2rem', width: '2rem' }} src={logo} alt="logo" />
                    <div className='title'>
                        <NavLink to='/' style={navStyleLink}>
                            <span > FlickFinder</span>
                        </NavLink>
                    </div>
                </div>
                <div className='navLeftSide'>
                <div className='other-NavComp'>
                    <NavLink to='/trending' style={navStyleLink}>
                        <span > Popular</span>
                    </NavLink>
                    </div>
                    <div className='other-NavComp'>
                    <NavLink to='/favourites' style={navStyleLink}>
                        <span > Favourites</span>
                    </NavLink>
                    </div>
                    <div className='other-NavComp'>
                    <NavLink to='/search' style={navStyleLink}>
                        <span > Movies</span>
                    </NavLink>
                    </div>
                </div>
                <div className='navRightSide'>
                    {
                        loggedIn ? <UserInfo loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                            : <button type="button" className="btn btn-dark" style={Login_ButtonStyle}
                                onClick={() => setLoginModalState(!loginModalState)}>Login</button>
                    }
                </div>

            </div>
            {loginModalState && < Loginmodal
                loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                sessionId1={sessionId1} setsessionId1={setsessionId1}
                setLoginModalState={setLoginModalState} />}
        </>
    )
}
