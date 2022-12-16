const authentication    = require("./auth.controller");
const admin             = require("./admin.controller");
const home              = require("./home.controller");
const store             = require('./store.controller');

module.exports = {
    ...authentication,
    ...admin,
    ...home,
    ...store
}