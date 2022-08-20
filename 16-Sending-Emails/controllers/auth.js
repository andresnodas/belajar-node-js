const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const User = require('../models/user');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bb405eb1ad278f",
      pass: "132e32f6acab3b"
    }
  });

exports.getLogin = (req, res, next) => {
    // console.log(req.session.user);
    // console.log(req.session.isLoggedIn);
    const message = req.flash('error');

    res.render('auth/login', {pageTitle: 'Login', path: '/login', errorMessage: message.length > 0 ? message[0] : null});
}

exports.getSignup = (req, res, next) => {
    const message = req.flash('error');

    res.render('auth/signup', { path: '/signup', pageTitle: 'Signup', errorMessage: message.length > 0 ? message[0] : null});
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email})
    .then(user => {

        if(!user){
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }

        return bcrypt.compare(password, user.password)
        .then(doMatch => {
            if(doMatch) {
                //can add variable in req *this is can use on other routes
                req.session.user = user;
                req.session.isLoggedIn = true;
                // save session into mangodb has delay, using save to validate if it saved then res.redirect
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }

            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email : email })
    .then(userDoc => {
        if(userDoc) {
            req.flash('error', 'E-Mail exists already, please pick a different one.');
            return res.redirect('/signup');
        }
        
        return bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    cart: {items : []}
                });
        
                return user.save();
            })
            .then(result => {
                res.redirect('/login');
                
                return transporter.sendMail({
                    from: 'andres@nodas.com',
                    to: email,
                    subject: 'Signup succeeded',
                    text: '<h1>You successfully signed up!</h1>'
                });
            });
    })
    .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}