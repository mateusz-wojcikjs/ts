import React, {FC} from "react";
import Category from "../../../models/Category";
import "./MainHeader.css";
import {useWindowDimensions} from "../../../hooks/WindowDimensions";
import CategoryDropDown from "../../CategoryDropDown";
import {useParams} from "react-router-dom";

interface MainHeaderProps {
    category?: Category;
}

const MainHeader: FC<MainHeaderProps> = ({ category }) => {
    const {width} = useWindowDimensions();
    const {categoryId} = useParams();
    console.log(categoryId)
    const getLabelElement = () => {
        return width < 768
            ? (<CategoryDropDown navigate={true} preselectedCategory={category} />)
            : (<strong>{category?.name || "Placeholder"}</strong>)
    }

    return (
        <div className="main-header">
            <div
                className="title-bar"
                style={{ marginBottom: ".25em", paddingBottom: "0" }}
            >
                {getLabelElement()}
            </div>
        </div>
    );
};

export default MainHeader;