import React, {useEffect, useState} from 'react';
import {useWindowDimensions} from "../../../hooks/WindowDimensions";
import {getTopCategories} from "../../../services/DataService";
import groupBy from "lodash/groupBy";
import TopCategory from "./TopCategory";

const RightMenu = () => {
    const [topCategories, setTopCategories] = useState<
        Array<JSX.Element> | undefined
        >();

    useEffect(() => {
        getTopCategories().then((res) => {
            const topCatThreads = groupBy(res, "category");
            const topElements = [];
            for (let key in topCatThreads) {
                const currentTop = topCatThreads[key];
                topElements.push(<TopCategory key={key} topCategories={currentTop} />);
            }
            setTopCategories(topElements);
        });
    }, []);
    const { width } = useWindowDimensions();
    if (width <= 768){
        return null;
    }
    return <div className="rightmenu">{topCategories}</div>;
};

export default RightMenu;
