const express = require("express");
const {engine} = require("express-handlebars");
const path =  require('path');
const session = require('express-session');
const {authenticationRoutes} = require('./routes/authentication.routes');

require('dotenv').config()

//initializations
//Start app
const app = express();

//settings
const dirViews = path.join(__dirname, "views");
app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", engine({
    defaultLayout: "main",
    layoutsDir: path.join(dirViews, "layouts"),
    partialsDir: path.join(dirViews, "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
}));
app.set("view engine", "hbs");



//Middleware
app.use(express.json());//recibir json
app.use(express.urlencoded({extended:false}));//Acepta imagenes
//express-session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 6000 //(1 minute == 6000 miliseconds)
    }
}));

//global variables
app.use((req, res, next) => {
    console.log("--indexServer:", req.session.activeSession);
    app.locals.activeSession = req.session.activeSession;
    next();
}); 

//ROUTES
app.use("/home", require('./routes/home.routes.js'));
app.use("/store",require('./routes/store.routes'));
app.use("/auth", require('./routes/authentication.routes.js'));
app.use("/admin", require('./routes/admin.routes.js'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//404 error

//starting  server
app.listen(process.env.PORT, ()=>{
    console.log("listening to port", process.env.PORT);
})


/** ESTRUCTURA que debe tener el app */


/**
 * 1. Importaciones propias de node.js ( path )
 * 2. Importaciones de modulos de terceros ( dotenv, express, express-handlebars, handlebars, etc)
 * 3. Importaciones de configuración de base de datos 
 * 4. Importacion de modulos propios ( según su uso y flujo del programa )
 * 5. Inicializzaciónn de express en la variable app
 * 6. Opcional - obtención de las varaibles de entorno y asignarlas a constantes ( usa el modulo dotenv )
 * 7. SETTINGS
 * 8. MIDDLEWARE
 * 9. ROUTES
 * 10. PUBLIC
 * 11. 404 NOT FOUND
 * 12. app Listen
 */

