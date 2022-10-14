import { ThreadCategory } from "./ThreadCategory";
import {QueryArrayResults} from "../types/QueryArrayResults";

export const getAllCategories = async (): Promise<
    QueryArrayResults<ThreadCategory>
    > => {
    const categories = await ThreadCategory.find();

    return {
        entities: categories,
    };
};
