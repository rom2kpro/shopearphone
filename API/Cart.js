const axios = require('axios');
const url = process.env.URL_API;

module.exports.add = async(payload) => {
    const result = await axios.post(`${url}api/cart/`, payload);
    return result.data;
}

module.exports.get = async(id) => {
    const result = await axios.get(`${url}api/cart/` + id );
    return result.data;
}

module.exports.update = async(id, payload) => {
    const result = await axios.put(`${url}api/cart/` + id, payload);
    return result.data;
}

module.exports.delete = async(id) => {
    const result = await axios.delete(`${url}api/cart/` + id);
    return result.data;
}