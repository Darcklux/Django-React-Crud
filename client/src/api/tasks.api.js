import axios from 'axios'

const tasksApi = axios.create({
    baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
});

export const getAllTasks = async (accessToken) => {
    try {
        const response = await tasksApi.get('/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching tasks:',error);
        throw error;
    }
}

export const getTask = async (id, accessToken) => {
    try {
        const response = await tasksApi.get(`/${id}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching task:", error);
        th
    }
}

export const createTask = async (task, accessToken) => {
    try {
        const response = await tasksApi.post('/', task, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data
    } catch (error) {
        console.log('Error creating task:', error)
        throw error;

    }
}

export const deleteTask = async (id, accessToken) => {
    try {
        const response = await tasksApi.delete(`/${id}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error deleting task:', error);
        throw error;
    }

}

export const updateTask = async (id, task, accessToken) => {
    try {
        const response = await tasksApi.put(`/${id}/`, task, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
    } catch (error) {
        console.log("Error updating task:", error);
        throw error;
    }
}
