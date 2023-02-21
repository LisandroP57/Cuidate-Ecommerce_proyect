    /* Require's */
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const PORT = 4000;

    /* Express */
const app = express();


    /* Middlewares */
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride("_method"));
    app.use(express.json());

    /* Template engine */
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

    /* Routes  */
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const usersRouter = require('./routes/users');

    /* Routes Middlewares */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

        /* Error 404 */
app.use((req, res, next) => {
    res.status(404).render('not-found')
})


    /* Listen port */
app.listen(PORT, () => console.log(`Server listen in port ${PORT} - Click next ->\nhttp://localhost:${PORT}`));