const {request, response} = require('express');
const db = require('../database/config');

const productsView = async(req= request, res = response) =>{
    try {
        const query = `SELECT * FROM product`;
        const products = await db.executeQuery(query);
        // console.log("--store: ", {products});
        return res.render('./store/products', {products});

    } catch (error) {
        console.log("--store: ", error);
        return res.json({
            ok: false,
            message: 'Theres a problem to show the content'
        });
    }
}
module.exports = {
    productsView
}