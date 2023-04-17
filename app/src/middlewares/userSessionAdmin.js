module.exports = (req, res, next) => {
    req.session.user.role === 1 ? next() : res.redirect("/");
}