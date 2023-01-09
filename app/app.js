const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')))

app.get("/404", (req,res) => {
    return res.send("Error página no encontrada")
})

app.get("/Home", (req,res) => {
    return res.sendFile(path.join(__dirname, "/views/Home.html"));
})

app.get("/Login", (req,res) => {
    return res.sendFile(path.join(__dirname, "/views/Login.html"));
})

app.get("/Register", (req,res) => {
    return res.sendFile(path.join(__dirname, "/views/Register.html"));
})

app.get("/vistaProducto", (req,res) => {
    return res.sendFile(path.join(__dirname, "/views/VistaProducto.html"));
})
app.get("/carrito", (req,res) => {
    return res.sendFile(path.join(__dirname, "/views/carrito.html"));
})

app.listen(3000, ()=>console.log("El servidor esta escuchando en el puerto 3000"));