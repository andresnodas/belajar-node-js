const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouters = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use((req, res, next) => {
    User.findById("5fc7a940cf3f848227775b42")
    .then(user => {
        //can add variable in req *this is can use on other routes
        //user is sequalize object not only javascript plain object
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRouters);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});