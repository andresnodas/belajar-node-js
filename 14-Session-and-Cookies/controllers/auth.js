const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    console.log(req.session.user);
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {pageTitle: 'Login', path: '/login', isAuthenticated: false});
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    User.findById("5fc8dc95c8632619ec7ea930")
    .then(user => {
        //can add variable in req *this is can use on other routes
        //user is sequalize object not only javascript plain object
        req.session.user = user;
        req.session.isLoggedIn = true;
        // save session into mangodb has delay, using save to validate if it saved then res.redirect
        return req.session.save();
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}