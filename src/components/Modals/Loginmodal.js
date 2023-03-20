import React , {useState} from 'react'
import ReactDom from 'react-dom'
import { Login } from './Login'
import { Register } from './Register'

export default function Loginmodal(props) {
    const [currentForm, setCurrentForm] = useState('login');


    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: 'transparent'
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    {
                        currentForm === "login" ? <Login onFormSwitch={toggleForm} setLoginModalState={props.setLoginModalState} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}
                        sessionId1={props.sessionId1} setsessionId1={props.setsessionId1} /> 
                        : <Register onFormSwitch={toggleForm}  setLoginModalState={props.setLoginModalState}/>
                    }
                </div>
            </div>
        </>,
        document.getElementById('portal')

    )
}
