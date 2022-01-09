module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user.user.role != "customer")
        return next();
    res.redirect('/admin/login');
}