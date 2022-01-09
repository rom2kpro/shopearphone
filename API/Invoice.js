const axios = require('axios');
const url = process.env.URL_API;

module.exports.add = async(payload) => {
    const result = await axios.post(`${url}api/invoice/`, payload);
    return result.data;
}

module.exports.get = async(id) => {
    const result = await axios.get(`${url}api/invoice/` + id);
    return result.data;
}

module.exports.getByInvoiceId = async(id) => {
    const result = await axios.get(`${url}api/invoice/?id_invoice=` + id);
    return result.data;
}

