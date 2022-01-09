const axios = require('axios');
const url = process.env.URL_API;

module.exports.get = async() => {
    const result = await axios.get(`${url}api/brand/`);
    return result.data;
}