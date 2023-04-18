import axios from 'axios';

const API_URL = 'https://643d54b56afd66da6af3fb77.mockapi.io/autocar/api';


export const createService = async (serviceName, clientName, clientCar,budget,autoParts,autoPartsPrices,collaborator, status, finishedAt) => {
  const response = await axios.post(`${API_URL}/services`, {
      serviceName,
      clientName,
      clientCar,
      budget,
      autoParts,
      autoPartsPrices,
      collaborator,
      status,
      finishedAt,
    })
    return response.data;
};

export const finishService = async (id, finishedAt,notes, status) => {
    const response = await axios.put(`${API_URL}/services/${id}`, {
        finishedAt,
        notes,
        status
      })
      return response.data;
  };

  export const getServices = async () => {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  };



  export const getServiceById = async (id) => {
    const response = await axios.get(`${API_URL}/services/${id}`);
    return response.data;
  };

  export const deleteService = async (id) => {
    const response = await axios.delete(`${API_URL}/services/${id}`);
    return response.data;
  };
