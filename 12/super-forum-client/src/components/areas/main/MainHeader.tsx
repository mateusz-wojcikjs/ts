import React, {FC, useEffect, useState} from "react";
import Category from "../../../models/Category";
import "./MainHeader.css";
import ReactDropdown from "react-dropdown";
import {useWindowDimensions} from "../../../hooks/WindowDimensions";
import {gql, useQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";

interface MainHeaderProps {
    category?: Category;
}
const options = [
    'one', 'two', 'three'
];

const GetAllCategories = gql`
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`;

const MainHeader: FC<MainHeaderProps> = ({ category }) => {
    const {width} = useWindowDimensions();
    const {data, loading, error} = useQuery(GetAllCategories);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
            const categoryNames = data.getAllCategories.map((category: any) => {
                return({
                label: category.name,
                value: category.id
                });
            });
            setCategories(categoryNames)
    }, []);

    console.log(categories)

    return (
        <div className="main-header">
            {width < 768 && (<ReactDropdown options={categories} onChange={e => navigate(`/categorythreads/${e.value}`)} />)}
            <div
                className="title-bar"
                style={{ marginBottom: ".25em", paddingBottom: "0" }}
            >
                <strong>{category?.name || "Placeholder"}</strong>
            </div>
        </div>
    );
};

export default MainHeader;