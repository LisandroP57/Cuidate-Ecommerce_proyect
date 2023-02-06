const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static("public"));

    /* Template engine */
app.set("view engine", "ejs");
app.set("views", "./src/views");

    /* Routers */
const indexRouter = require("./routes");
const productsRouter = require("./routes/products");
const usersRouter = require('./routes/users');

    /* Routes Middlewares */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);
app.use("/vistaProducto", productsRouter);

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));