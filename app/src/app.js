    /* Require's */
const express = require("express");
const path = require("path");
const PORT = 3000;
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require("cookie-parser");


const cookieCheck = require("./middlewares/cookieCheck");

    /* Express */
const app = express();

/* Template engine */
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

    /* Middlewares */
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride("_method"));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(session({
        secret: "Cuidate",
        resave: false,
        saveUninitialized: true
    }));

    app.use(cookieCheck);

    app.use(cookieParser());

    /* Routes  */
const indexRouter = require("./routes");
const productsRouter = require("./routes/products");
const usersRouter = require('./routes/users');


    /* Routes Middlewares */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

        /* Error 404 */
app.use((req, res, next) => {
    res.status(404).render('not-found', { session: req.session })
})

    /* Listen port */
app.listen(PORT, () => console.log(`Server listen in port ${PORT} - Click next ->\nhttp://localhost:${PORT}`));