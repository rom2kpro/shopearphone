const axios = require('axios');
const url = process.env.URL_API;

module.exports.add = async(payload) => {
    const result = await axios.post(`${url}api/comment/`, payload);
    return result.data;
}

module.exports.getCommentByIdProduct = async(id) => {
    const result = await axios.get(`${url}api/comment/?id_product=` + id);
    return result.data;
}

module.exports.delete = async(id) => {
    const result = await axios.delete(`${url}api/comment/` + id);
    return result.data;
}