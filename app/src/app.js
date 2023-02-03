const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static("./public"));

    /* Template engine */
app.set("view engine", "ejs");
app.set("views", "./src/views");

    /* Routers */
const indexRouter = require("./routes");

    /* Routes Middlewares */
    app.use("/", indexRouter);

    app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));