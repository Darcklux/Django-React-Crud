import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

const userApi = axios.create({
  baseURL: 'http://localhost:8000/tasks/api/v1/',
});

export const loginUser = async (username, password) => {
  try {
    const response = await authApi.post('token/', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (data) => {
  try {
    const response = await userApi.post('register/', data);
    return response.data;
  } catch (error) {
    console.log('Error signing up user:', error);
    throw error;
  }
};

export const getCurrentUser = async (accessToken) => {
  try {
    const response = await userApi.get('user/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
