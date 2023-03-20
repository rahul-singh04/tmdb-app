import axios from "axios";
import React, { useState } from "react";
import Cookies from 'js-cookie';

export const Login = (props) => {
    const [userName, setuserName] = useState('');
    const [pass, setPass] = useState('');

    const [passMatch, setPassMatch] = useState(true);

 
    const handleSubmit = (e) => {
        e.preventDefault();
        //Authentication Code
        axios
            .get('https://api.themoviedb.org/3/authentication/token/new?api_key=0a62a91a7346c3452d52fcfbebc81be2')
            .then((response) => {
                const requestToken = response.data.request_token;

                const body = {
                    username: userName,
                    password: pass,
                    request_token: requestToken,
                };
                return axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=0a62a91a7346c3452d52fcfbebc81be2`, body);
            })
            .then((response) => {
                const validatedRequestToken = response.data.request_token;

                const body = {
                    request_token: validatedRequestToken,
                };

                return axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=0a62a91a7346c3452d52fcfbebc81be2`, body);
            })
            .then((response) => {
                
                const sessionId = response.data.session_id;
                props.setsessionId1(response.data.session_id);
                        // console.log(`Successfully logged in. Session ID: ${sessionId}`);
                        Cookies.set('session_id', sessionId, { expires: 7 });
                        setPassMatch(true)
                        props.setLoggedIn(true);
                        setTimeout(() => {
                            props.setLoginModalState(false);
                        }, 1000);
                    

            })
            .catch((error) => {
                console.error(error.response.status)
                setPassMatch(false)
            });
    }



    return (
        <div className="auth-form-container">
            <i class="fa-solid fa-xmark closeIcon" onClick={() => props.setLoginModalState(false)}></i>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="Username">Username</label>
                <input onChange={(e) => setuserName(e.target.value)} type="text" placeholder="xyz" id="Username" name="Username" />
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                {
                    props.loggedIn ? <i class="fa-solid fa-circle-check " style={{ color: 'green', alignSelf: 'center', marginTop: '2rem' }}></i>
                        : <button type="submit" class="btn btn-success loginBtn">Log In</button>
                }
                {
                    passMatch ? ''
                        : <button className="link-btn" style={{ textDecoration: 'none', color: 'red' }}>Password's Don't Match, Try with a different one</button>
                }
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}