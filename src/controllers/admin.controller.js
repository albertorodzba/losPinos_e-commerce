const {request, response} = require('express');
const {randomCharacters} = require('../Helpers');
const db = require('../database/config');

const adminView = async(req= request, res = response) => {
    try {
        const query = `SELECT * FROM product`;
        const products = await db.executeQuery(query);
        console.log("--admin: ", {products});
        return res.render("./admin/admin.hbs", {products});
    } catch (error) {
        console.log("--admin: ", error);
        return res.json({
            ok: false,
            message: 'Theres a problem to show the content'
        });
    }
    // console.log("--adminController: ",{cookie: req.session.cookie, sessiononserver: req.sessionID});
}

const addProduct = async(req = request, res = response)=>{
    const { productName, description, image, cost } = req.body;
    const id_product = randomCharacters();
    const query = `INSERT INTO product VALUES ("${id_product}", "${productName}", "${description}", "${image}", "${cost}");`;
    try{
        const queryResult = await db.executeQuery(query);
        return res.redirect('/admin');
        // return res.json({
        //     ok:true,
        //     message: queryResult+" was inserted success"
        // });
    }catch(error){
        console.log("--admin: ", error);
        return res.json({
            ok: false,
            message: 'Can not add a new product'
        });
    }

}

module.exports = {
    adminView,
    addProduct
}