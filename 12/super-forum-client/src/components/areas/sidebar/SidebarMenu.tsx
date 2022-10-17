import React, { useState} from 'react';
import { useSelector} from "react-redux";
import {AppState} from "../../../store/AppState";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faRegistered, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "./SidebarMenu.css"
import Registration from "../../auth/Registration";
import Login from "../../auth/Login";
import {Link} from "react-router-dom";
import Logout from "../../auth/Logout";

const SidebarMenu = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    }

    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    }

    const onClickToggleLogout = () => {
        setShowLogout(!showLogout);
    };

    const user = useSelector((state: AppState) => state.user);

    return (
        <>
         <ul>
             {user ? (<li>
                        <FontAwesomeIcon icon={faUser}/>
                        <span className="menu-name"><Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link></span>
                    </li>) : null}
             {user ? null : (<li>
                 <FontAwesomeIcon icon={faRegistered}/>
                 <span onClick={onClickToggleRegister} className="menu-name">Rejestracja</span>
                 <Registration isOpen={showRegister} onClickToggle={onClickToggleRegister}/>
             </li>)}
             {user ? null : (<li>
                 <FontAwesomeIcon icon={faSignInAlt}/>
                 <span onClick={onClickToggleLogin} className="menu-name">Logowanie</span>
                 <Login isOpen={showLogin} onClickToggle={onClickToggleLogin}/>
             </li>)}
             {user ? (
                 <li>
                     <FontAwesomeIcon icon={faSignOutAlt} />
                     <span onClick={onClickToggleLogout} className="menu-name">Wylogowanie</span>
                     <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout} />
                 </li>
             ) : null}
         </ul>
        </>
    );
};

export default SidebarMenu;
