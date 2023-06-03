module.exports = (req, res, next) => {
    if(req.cookies.userCuidate && !req.session.user) {
        req.session.user = req.cookies.userCuidate;
        res.locals.user = req.session.user;
    }
    next();
}