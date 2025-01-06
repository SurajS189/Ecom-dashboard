import axios from 'axios';

export const fetchCategory = async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/category-list`, {
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Category", error);
    throw error;
  }
};
