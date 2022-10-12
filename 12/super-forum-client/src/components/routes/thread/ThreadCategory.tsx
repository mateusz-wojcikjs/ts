import React, { FC } from "react";
import DropDown, { Option } from "react-dropdown";
import "react-dropdown/style.css";

interface ThreadCategoryProps {
    categoryName?: string;
}

const ThreadCategory: FC<ThreadCategoryProps> = ({ categoryName }) => {
    const catOptions: Array<string | Option> = [
        {
            value: "1",
            label: "Programowanie",
        },
        {
            value: "2",
            label: "Gotowanie",
        },
    ];
    const defaultOption = catOptions[0];
    const onChangeDropDown = (arg: Option) => {
        console.log(arg);
    };

    return (
        <div className="thread-category-container">
            <strong>{categoryName}</strong>
            <DropDown
                className="thread-category-dropdown"
                options={catOptions}
                onChange={onChangeDropDown}
                value={defaultOption}
                placeholder="Wybierz kategorię"
            />
        </div>
    );
};

export default ThreadCategory;
