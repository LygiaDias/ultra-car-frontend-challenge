import axios from 'axios';

const API_URL = 'https://643d54b56afd66da6af3fb77.mockapi.io/autocar/api';

export const getCollaborators = async () => {
    const response = await axios.get(`${API_URL}/collaborators`);
    return response.data;
  };
export const getCollaboratorById = async (id) => {
    const response = await axios.get(`${API_URL}/collaborators/${id}`);
    return response.data;
  };

  export const deleteCollaborator = async (id) => {
    const response = await axios.delete(`${API_URL}/collaborators/${id}`);
    return response.data;
  };
