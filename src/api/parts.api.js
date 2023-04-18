import axios from 'axios';

const API_URL = 'https://643d54b56afd66da6af3fb77.mockapi.io/autocar/api';


export const getParts = async () => {
    const response = await axios.get(`${API_URL}/carParts`);
    return response.data;
  };


  export const createPart = async (partName, price) => {
    const response = await axios.post(`${API_URL}/carParts`, {
        partName,
        price
      })
      return response.data;
  };
