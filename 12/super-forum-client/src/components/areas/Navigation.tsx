import React, {useState} from 'react';
import ReactModal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useWindowDimensions} from "../../hooks/WindowDimensions";
import SidebarMenu from "./sidebar/SidebarMenu";
import "./Navigation.css"

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { width } = useWindowDimensions();

    const getMobileMenu = () => {
        if (width <= 768){
            return <FontAwesomeIcon onClick={onClickToggle} icon={faBars} size="lg" className="nav-mobile-menu"/>;
        }
        return null;
    }


    const onClickToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
        setShowMenu(!showMenu);
    };

    const onRequestClose = (
        e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
    ) => {
        setShowMenu(false);
    };

    return (<>
        <ReactModal
            className="modal-menu"
            isOpen={showMenu}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
        >
            <SidebarMenu />
        </ReactModal>
        <nav>{getMobileMenu()} <strong>SuperForum</strong></nav>
    </>
    );
};

export default Navigation;
