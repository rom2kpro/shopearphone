const axios = require('axios');
const url = process.env.URL_API;

module.exports.login = async(payload) => {
    const result = await axios.post(`${url}api/user/login/`, payload);
    return result.data;
}

module.exports.register = async(payload) => {
    const result = await axios.post(`${url}api/user/register/`, payload);
    return result.data;
}

module.exports.addstaff = async(payload, config) => {
    const result = await axios.post(`${url}api/user/admin/staff`, payload, config);
    return result.data;
}

module.exports.getstaff = async(config) => {
    const result = await axios.get(`${url}api/user/admin/staff`, config);
    return result.data;
}

module.exports.deletestaff = async(id, config) => {
    const result = await axios.delete(`${url}api/user/admin/staff/` + id, config);
    return result.data;
}

module.exports.getcustomer = async(config) => {
    const result = await axios.get(`${url}api/user/`, config);
    return result.data;
}