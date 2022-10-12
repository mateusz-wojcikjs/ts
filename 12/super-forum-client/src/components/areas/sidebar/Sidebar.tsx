import React from 'react';
import {useWindowDimensions} from "../../../hooks/WindowDimensions";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
    const { width } = useWindowDimensions();
    if (width <= 768){
        return null;
    }
    return <div className="sidebar">
        <SidebarMenu />
    </div>;
};

export default Sidebar;
