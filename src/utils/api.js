import axios from 'axios';

export const fetchProducts = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products`, {
      params: { offset, limit }//fetching next  10 products
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};
