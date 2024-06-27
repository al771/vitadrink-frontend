import axios, {AxiosResponse} from 'axios';
import {Cocktail} from "../types/Cocktail";

import { cocktails } from '../cocktails.js';

// export async function getCocktail(id: string): Promise<Cocktail> {
//     const res = await axios.get<AxiosResponse<Cocktail>>(`${import.meta.env.VITE_BACKEND_URL}api/recipes/${id}`);
//     //@ts-ignore
//     return res.data;
// }

export function getCocktail(id: string): Cocktail {
    return cocktails.find((el => el._id === id))!;
}