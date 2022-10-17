import React, {FC, useEffect, useState} from 'react';
import Category from "../models/Category";
import {useSelector} from "react-redux";
import {AppState} from "../store/AppState";
import DropDown, {Option} from "react-dropdown";
import {useNavigate} from "react-router-dom";

const defaultLabel = "Wybierz kategorię";
const defaultOption = {
    value: "0",
    label: defaultLabel,
};

class CategoryDropDownProps {
    sendOutSelectedCategory?: (cat: Category) => void;
    navigate?: boolean = false;
    preselectedCategory?: Category;
}

const CategoryDropDown: FC<CategoryDropDownProps> = (
    {
        sendOutSelectedCategory,
        navigate,
        preselectedCategory
    }
) => {
    const categories = useSelector((state: AppState) => state.categories);
    const [categoryOptions, setCategoryOptions] = useState<Array<string | Option>>([defaultOption]);
    const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);
    const navigateRouter = useNavigate();

    useEffect(() => {
        if (categories) {
            const catOptions: Array<Option> = categories.map(category => {
                return {
                    value: category.id,
                    label: category.name,
                };
            });
            setCategoryOptions(catOptions);
            setSelectedOption({
                value: preselectedCategory ? preselectedCategory.id : "0",
                label: preselectedCategory ? preselectedCategory.name : defaultLabel,
            });
        }
    }, [categories, preselectedCategory]);

    const onChangeDropDown = (selected: Option) => {
        setSelectedOption(selected);
        sendOutSelectedCategory && sendOutSelectedCategory(new Category(selected.value, selected.label?.valueOf().toString() ?? ""));
        navigate && navigateRouter(`/categorythreads/${selected.value}`);
    }

    return (
        <DropDown options={categoryOptions} className="thread-category-dropdown" onChange={onChangeDropDown} value={selectedOption} placeholder={defaultLabel} />
    );
};

export default CategoryDropDown;
