import {createBrowserRouter} from "react-router-dom";
import HomePage from "./pages/HomePage";
import React from "react";
import CocktailPage from "./pages/CocktailPage";
import {cocktailPageLoader} from "./pages/cocktailPageLoader";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {path: '', element: <HomePage/>,},
            {
                path: '/cocktails/:cocktailId',
                loader: cocktailPageLoader,
                element: <CocktailPage/>
            },
        ]
    },
]);