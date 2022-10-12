import React, { useState} from 'react';
import { useSelector} from "react-redux";
import {AppState} from "../../../store/AppState";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faRegistered, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import "./SidebarMenu.css"
import Registration from "../../auth/Registration";
import Login from "../../auth/Login";
import {Link} from "react-router-dom";

const SidebarMenu = () => {
    const [showRegister, setShowRegister] = useState(false);

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    }
    const [showLogin, setShowLogin] = useState(false);

    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    }

    const user = useSelector((state: AppState) => state.user);

    return (
        <>
         <ul>
             <li>
                 <FontAwesomeIcon icon={faUser}/>
                 <span className="menu-name"><Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link></span>
             </li>
             <li>
                 <FontAwesomeIcon icon={faRegistered}/>
                 <span onClick={onClickToggleRegister} className="menu-name">Rejestracja</span>
                 <Registration isOpen={showRegister} onClickToggle={onClickToggleRegister}/>
             </li>
             <li>
                 <FontAwesomeIcon icon={faSignInAlt}/>
                 <span onClick={onClickToggleLogin} className="menu-name">Logowanie</span>
                 <Login isOpen={showLogin} onClickToggle={onClickToggleLogin}/>
             </li>
         </ul>
        </>
    );
};

export default SidebarMenu;
