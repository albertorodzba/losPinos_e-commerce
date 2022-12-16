const { request, response } = require("express");
const db = require('../database/config.js');
const {randomCharacters} = require('../Helpers/index.js');

/**SIGN IN */
const signInView = (req = request, res = response) => {
    res.render('./authentication/signin.hbs');
}

const signIn = async (req = request, res = response) => {
    const { correo, contrasena } = req.body;
    console.log(req.body);
    try {
        /*IMPORTANT DOUBLE QUOTES TO REPRESENT A STRING*/
        const query = `SELECT id_user FROM user WHERE email = "${correo}" and password = "${contrasena}" and is_enable = 1;`
        const user = await db.executeQuery(query); 
        //console.log(user.length);


        if (user.length == 0) {
            return res.json({
                msg: "No existe el usuario",
                ok: false
            });
        }

        /**saves the session */
        /*req.session.user is id_user retrieved from DB*/
        req.session.userID = user[0]['id_user'];
        req.session.typeOfUser = '';
        req.session.activeSession = true;
        req.session.save();
        console.log("--authController:",req.session.userID, req.session.typeOfUser);
        req.active = true;
        // res.json({
        //     msg: "Usuario encontrado",
        //     id: user[0]['id_user'],
        //     session: req.session,
        //     reqSession: req.session.user,
        //     reqID: req.sessionID,
        //     reqStore: req.sessionStore,
        //     ok: true
        // });
        res.redirect("/home");

    } catch (err) {
        console.log(err);
    }
}

/**Logout */
const logout = (req = request, res= response) => {
    req.session.destroy();
    res.redirect("/auth/signin");
}

/**SIGN UP */
const signUpView = (req = request, res= response) => {
    res.render("./authentication/register.hbs");
}

const signUp = async(req = request, res = response) =>{
    const {
        name,
        last_name,
        private_phonenumber,
        rfc,
        company_name,
        postal_code,
        state,
        city,
        suburb,
        street,
        dwelling_number,
        street_one,
        street_two,
        company_phonenumber,
        email,
        password,
        password_confirmation
    } = req.body;
    
    const betweenStreet = street_one+ " & "+ street_two;
    if(password !== password_confirmation){
        return res.json({
            ok: false,
            message: 'Passwords must be the same'
        });
    }

    try {
        const id_user = 'CUST'+randomCharacters();
        const createUserQuery = `INSERT INTO user VALUES ("${id_user}", "${email}", "${password}", DEFAULT, 2);`
        await db.executeQuery(createUserQuery);

        const customerCounter = await db.executeQuery('SELECT COUNT(*) FROM customer;');
        // console.log("--authController",customerCounter[0]['COUNT(*)']+1);       
        const registerCustomerQuery = `INSERT INTO customer VALUES ("CUSTOMER${customerCounter[0]['COUNT(*)']+1}", "${name}", "${last_name}", "${company_name}", "${postal_code}",`+
            `"${street}", "${dwelling_number}", "${betweenStreet}", "${suburb}", "${city}", "${state}", "${rfc}", "${private_phonenumber}", "${company_phonenumber}", "${id_user}");`
        await db.executeQuery(registerCustomerQuery);

    } catch (error) {
        console.log("--authController",error);
        return res.json({
            ok:false,
            message : 'Report this problem to the admin',
        });
    }
    return res.redirect("/auth/signin");

}


module.exports = {
    signInView,
    signIn,
    signUpView,
    signUp,
    logout
}