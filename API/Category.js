const axios = require('axios');
const url = process.env.URL_API;

module.exports.getCategory = async() => {
    const result = await axios.get(`${url}api/category/`);
    return result.data;
}

module.exports.getCatChild = async(id) => {
    const result = await axios.get(url+'api/category/' + id);
    return result.data;
}

module.exports.addCategory = async(payload, config) => {
    const result = await axios.post(`${url}api/category/`, payload, config);
    return result.data;
}

module.exports.updateCategory = async(id, payload, config) => {
    const result = await axios.put(`${url}api/category/` + id, payload, config);
    return result.data;
}

module.exports.deleteCategory = async(id, config) => {
    const result = await axios.delete(`${url}api/category/`+ id, config);
    return result.data;
}

module.exports.addCateChild = async(id, payload, config) => {
    const result = await axios.post(`${url}api/category/` + id, payload, config);
    return result.data;
}

module.exports.deleteCateChild = async(id, config) => {
    const result = await axios.delete(`${url}api/category/catechild/`+ id, config);
    return result.data;
}

module.exports.updateCateChild = async(id, payload, config) => {
    const result = await axios.put(`${url}api/category/catechild/` + id, payload, config);
    return result.data;
}