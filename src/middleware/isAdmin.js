const {request, response} = require('express');
const db = require('../database/config');

/**Check if the user has an ADMIN role */
const isAdmin = async(req = request, res = response, next) =>{
    const userID = req.session.userID;
    console.log("--IsAdmin: userID",userID);
    if(!userID){
        //if there is no session
        return res.redirect("/auth/signin");   
    }
    const query = `SELECT role FROM role INNER JOIN user ON role.id = user.FK_role_id WHERE id_user = "${userID}"`;
    try {
        const typeOfUser = await db.executeQuery(query);
        console.log("--IsAdmin: typeofUser",typeOfUser[0]['role']);
            if(typeOfUser[0]['role'] === 'ADMIN'){
                req.session.typeOfUser = 'ADMIN'
                return next();
            }     
    } catch (error) {
        console.log(error);
    }
    
}


module.exports = isAdmin;