const {request, response } = require('express');

const viewHomePage = (req = request, res = response) => {
    const user = req.session.userID;
    res.render("./home/homeView.hbs",{user})
}

module.exports = {
    viewHomePage
}