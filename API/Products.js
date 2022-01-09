const axios = require('axios');
const url = process.env.URL_API;

module.exports.getProduct = async() => {
    const result = await axios.get(`${url}api/product/`);
    return result.data;
}

module.exports.getProductDetail = async(id) => {
    const result = await axios.get(`${url}api/product/` + id);
    return result.data;
}

module.exports.getProductByCatChildID = async(id) => {
    const result = await axios.get(`${url}api/product/?id_catchild=` + id);
    return result.data;
}

module.exports.searchName = async(search) => {
    const result = await axios.get(`${url}api/product/?search=` + search);
    return result.data;
}

module.exports.add = async(payload, config) => {
    const result = await axios.post(`${url}api/product/`, payload, config);
    return result.data;
}

module.exports.update = async(id, payload, config) => {
    const result = await axios.put(`${url}api/product/`+id  , payload, config);
    return result.data;
}