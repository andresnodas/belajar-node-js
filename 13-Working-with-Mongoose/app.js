const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
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
    User.findById("5fc8dc95c8632619ec7ea930")
    .then(user => {
        //can add variable in req *this is can use on other routes
        //user is sequalize object not only javascript plain object
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRouters);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://localhost:27017/shop?readPreference=primary&ssl=false')
.then(() => {

    return User.findOne().then(user => {
        if(!user) {
            const user = new User({
                name: 'Andres Nodas',
                email: 'nodas@test.com',
                cart: {
                    items: []
                }
            });

            user.save();
        }
    });
    
})
.then(() => {
    
    console.log('Connected!');
    app.listen(3000);
})
.catch(err => console.log(err));