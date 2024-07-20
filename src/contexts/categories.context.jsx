import { createContext, useState, useEffect } from "react";

// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import PRODUCTS from "../data/shop-data.json";
// import SHOP_DATA from "../data/shop-data.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [ categoriesMap, setCategoriesMap ] = useState({});
    
    /* // Only runs one time. To populate the db.
    useEffect(() => {
        addCollectionAndDocuments("categories", SHOP_DATA);
    }, []);
    */
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);

            setCategoriesMap(categoryMap);
        };
        
        getCategoriesMap();
    },[]);

    const value = { categoriesMap }

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};
