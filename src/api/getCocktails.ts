import axios, {AxiosResponse} from 'axios';
import {Cocktail} from "../types/Cocktail";

import { cocktails } from '../cocktails.js';

// export async function getCocktails(): Promise<Cocktail[]> {
//     const res = await axios.get<AxiosResponse<Cocktail[]>>(`${import.meta.env.VITE_BACKEND_URL}api/recipes`);
//     //@ts-ignore
//     return res.data;
// }

export function getCocktails(): Cocktail[] {
    return cocktails;
}