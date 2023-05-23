    /* Require's */
const express = require("express");
const path = require("path");
const PORT = 3000;
const methodOverride = require('method-override');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");

    // Rutas
const [ 
    userRouter, 
    productRouter, 
    cartRouter, 
    categoryRouter
] = require("./routes");

    /* Express */
const app = express();

    /* Template engine */
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

    /* Middlewares */
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride("_method"));
    app.use(cors());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(session({
        secret: "Cuidate",
        resave: false,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(cookieCheck);

    /* Routes  */
const indexRouter = require("./routes");
const productsRouter = require("./routes/products");
const usersRouter = require('./routes/users');
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

    /* Routes Apis */
app.use(`/api/users`, userRouter);
app.use(`/api/products`, productRouter);
app.use(`/api/cart`, cartRouter);
app.use(`/api/categories`, categoryRouter);

    /* Routes Middlewares */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/admin", adminRouter);
app.use("/api/v1", apiRouter);

    /* Error 404 */
app.use((req, res, next) => {
    res.status(404).render('not-found', { session: req.session })
})

    /* Listen port */
app.listen(PORT, () => console.log(`Server listen in port ${PORT} - Click next ->\nhttp://localhost:${PORT}`));