import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/DataService";
import Category from "../../models/Category";
import "./LeftMenu.css";
import {useWindowDimensions} from "../../hooks/WindowDimensions";

const LeftMenu = () => {
    const { width } = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Menu z lewej</div>
    );

    useEffect(() => {
        getCategories()
            .then((categories: Array<Category>) => {
                const cats = categories.map((cat) => {
                    return <li key={cat.id}>{cat.name}</li>;
                });
                setCategories(<ul className="category">{cats}</ul>);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (width <= 768) {
        return null;
    }
    return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;
