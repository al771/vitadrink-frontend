import {LoaderFunctionArgs} from "react-router-dom";
import {getCocktail} from "../api/getCocktail";

export async function cocktailPageLoader({params}: LoaderFunctionArgs) {
    if (!params.cocktailId) {
        throw new Response("cocktail_not_found", { status: 404 });
    }

    try {
        const cocktail = await getCocktail(params.cocktailId);
        if (!cocktail) throw new Response("cocktail_not_found", { status: 404 });
        return cocktail;
    } catch (e) {
        throw new Response("cocktail_not_found", { status: 404 });
    }
}
