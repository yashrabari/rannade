const { Order, UserAddress, CartItem } = require('../models');
const mongoose = require('mongoose');


module.exports = {

    create: (req, res, next) => {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            user: req.body.user,
            order: req.body.order,
            address: req.body.address,
            paymentType: req.body.paymentType,
            paymentStatus: req.body.paymentStatus
        });

        order.save()
            .then(order => {

                CartItem.remove({ "user": req.body.user })
                    .exec()
                    .then(doc => {
                        res.status(201).json({
                            message: order
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: error
                        });
                    })



            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            })
    },

    userOrder: (req, res, next) => {

        const userId = req.params.userId;
        Order.find({ "user": userId })
            .select('address order orderDate paymentType paymentStatus isOrderCompleted')
            .populate('order.product', 'name productPic')
            .exec()
            .then(orders => {

                UserAddress.findOne({ "user": userId })
                    .exec()
                    .then(userAddress => {

                        const orderWithAddress = orders.map(order => {
                            const address = userAddress.address.find(userAdd => order.address.equals(userAdd._id));
                            return {
                                _id: order._id,
                                order: order.order,
                                address: address,
                                orderDate: order.orderDate,
                                paymentType: order.paymentType,
                                paymentStatus: order.paymentStatus,
                                isOrderComleted: order.isOrderComleted
                            }
                        });

                        res.status(200).json({
                            message: orderWithAddress
                        });

                    })
                    .catch(error => {
                        return res.status(500).json({
                            error: error
                        })
                    })


            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });

    }

}