 const checkAuth = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
} 

 const checkExistingUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    }
    next();
}
module.exports = { checkAuth,checkExistingUser};
