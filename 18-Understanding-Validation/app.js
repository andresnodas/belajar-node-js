const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb://localhost:27017/shop?readPreference=primary&ssl=false';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouters = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use(csrf());
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) return next();

    User.findById(req.session.user._id)
        .then((user) => {
            if (!user) {
                next();
            }
            //can add variable in req *this is can use on other routes
            //user is sequalize object not only javascript plain object
            req.user = user;
            next();
        })
        .catch((err) => {
            throw new Error(err);
        });
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRouters);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected!');
        app.listen(3000);
    })
    .catch((err) => console.log(err));
