const axios = require('axios');
const url = process.env.URL_API;

module.exports.add = async(payload, config) => {
    const result = await axios.post(`${url}api/informationuser/`, payload);
    return result.data;
}

module.exports.update = async(payload, config) => {
    const result = await axios.put(`${url}api/informationuser/`, payload);
    return result.data;
}