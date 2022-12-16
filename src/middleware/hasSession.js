const { request, response } = require("express");


const hasSession = (req = request, res = response, next) => {
    console.log(req.session.user, req.session.admin);
    if(req.session.user && req.session.admin === true){
        return next();
    }

    res.redirect('/auth/signin');
}

module.exports = hasSession;
