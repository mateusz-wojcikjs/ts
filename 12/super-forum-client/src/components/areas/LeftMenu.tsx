import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/DataService";
import Category from "../../models/Category";
import "./LeftMenu.css";
import {useWindowDimensions} from "../../hooks/WindowDimensions";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const GetAllCategories = gql`
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`;

const LeftMenu = () => {
    const { loading, error, data } = useQuery(GetAllCategories);
    const { width } = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Menu z lewej</div>
    );
    useEffect(() => {
        if (loading) {
            setCategories(<span>Trwa wczytywanie...</span>)
        } else if (error) {
            setCategories(<span>Podczas wczytywania kategorii wystąpił błąd...</span>)
        } else {
            if (data && data.getAllCategories) {
                const cats = data.getAllCategories.map((category: any) => {
                    return <li key={category.id}><Link to={`/categorythreads/${category.id}`}>{category.name}</Link></li>
                });

                setCategories(<ul className="category">{cats}</ul>);
            }
        }
    }, [data]);

    if (width <= 768) {
        return null;
    }
    return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;
