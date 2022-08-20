const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouters = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use((req, res, next) => {
    User.findByPk(1)
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

Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through : CartItem });
Product.belongsToMany(Cart, { through : CartItem });

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through : OrderItem });

sequelize
// .sync({force: true})
.sync()
.then(result => {
    return User.findByPk(1);
    // console.log(result);
})
.then(user => {

    if(!user)
        return User.create({ name: "Andres" , email: "nodasiniesta@gmail.com"});

    // should return promise because next you can use .then to chain this function
    // return Promise.resolve(user);
    return user;
})
.then(user => {
    // console.log(user);
    return user.getCart()
    .then(cart => {
        if(!cart)
            return user.createCart();
    })
    .catch(err => console.log(err));
})
.then(result => {
    
    app.listen(3000);
})
.catch(err => console.log(err));