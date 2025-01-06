import axios from 'axios';

export const fetchProducts = async ( limit = 10,skip=0,sort='asc') => {
  try {
    const response = await axios.get(`https://dummyjson.com/products`, {
      params: {  limit,skip ,sort}//fetching next  10 products
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};
