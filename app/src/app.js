const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;


/* const methodOverride = require('method-override'); */
app.use(express.static("public"));
/* app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json()); */

    /* Template engine */
app.set("view engine", "ejs");
app.set("views", "./src/views");

    /* Routers */
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

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));