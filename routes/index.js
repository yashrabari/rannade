const adminRoutes = require('./api/admins');
const categoryRoutes = require('./api/categories');
const userRoutes = require('./api/users');
const productRoutes = require('./api/products');
const cartItemRoutes = require('./api/cartItems');
const orderRoutes = require('./api/orders');


module.exports = {
    adminRoutes,
    categoryRoutes,
    userRoutes,
    productRoutes,
    cartItemRoutes,
    orderRoutes
}