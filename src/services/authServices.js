import instance from "./instance";

const authServices = {
    register: async (data) => {
        return await instance.post('/registerUser', data);
    },
    login: async (data) => {
        return await instance.post('/loginUser', data);
    },
    forgotPassword: async (email) => {
        return await instance.put('/forgotPassword', { email });
    },
    resetPassword: async (token, newPassword) => {
        return await instance.put(`/resetPassword/${token}`, { newPassword });
    }
}

export default authServices;
