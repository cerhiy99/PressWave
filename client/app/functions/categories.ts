// app/getCategories.ts

import axios, { AxiosResponse } from 'axios';
import { categoriesInterface } from '../interfaces/categoriesInterface';

export const getCategories = async (locale: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://localhost:4444/api/categories/get`,
      {params:{language:locale}}
    );
    return response.data.res;
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
