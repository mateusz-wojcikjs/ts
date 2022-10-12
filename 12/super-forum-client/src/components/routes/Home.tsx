import React, {FC} from 'react';
import Navigation from "../areas/Navigation";
import Sidebar from "../areas/sidebar/Sidebar";
import LeftMenu from "../areas/LeftMenu";
import Main from "../areas/main/Main";
import RightMenu from "../areas/rightMenu/RightMenu";
import "./Home.css";

const Home: FC = () => {
    return (
            <div className="screen-root-container home-container">
                <div className="navigation">
                    <Navigation />
                </div>
                <Sidebar />
                <LeftMenu />
                <Main />
                <RightMenu />
            </div>
    );
};

export default Home;
