import instance from "./instance";

const authServices = {
    register: async (data) => {
        return await instance.post('/api/v1/registerUser', data);
    },
    login: async (data) => {
        return await instance.post('/api/v1/loginUser', data);
    },
    forgotPassword: async (email) => {
        return await instance.put('/api/v1/forgotPassword', { email });
    },
    resetPassword: async (token, newPassword) => {
        return await instance.put(`/api/v1/resetPassword/${token}`, { newPassword });
    }
}

export default authServices;
