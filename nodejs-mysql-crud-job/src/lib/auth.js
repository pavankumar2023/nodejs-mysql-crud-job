module.exports = {
    isLoggedIn(req, res, next){
        if(!req.isAuthenticated()) return res.redirect('/sign-in');
        return next();
    },

    isNotLoggedId(req, res, next){
        if(!req.isAuthenticated()) return next();
        return res.redirect('/home');
    }
}