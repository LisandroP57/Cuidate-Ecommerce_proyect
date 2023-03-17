module.exports = (req, res, next) => {
    req.session.user.type === "ADMIN" ? next() : res.redirect("/");
}