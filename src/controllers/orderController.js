const orderService = require('../services/orderService');

exports.getOrdersByID = (req, res) => {
    const { user_id } = req.params

    orderService.getOrdersByID(user_id)
        .then((orders) => {
            res.json(orders)
        })
        .catch((error) => {
            console.error("Error getting orders", error);
            res.status(500).send('Error getting orders');
        })
}

exports.newOrder = (req, res) => {
    const user_id = req.body.user_id
    const order_id = req.body.order_id
    const totalPrice = req.body.totalPrice
    const products = req.body.basketString
    const date = req.body.date
    const address = req.body.address
    orderService.newOrder(user_id, order_id, products, totalPrice, date, address)
        .then(() => {
            console.log("Order created successfully")
            res.sendStatus(201)
        })
        .catch((error) => {
            console.error("Error creating order", error);
            res.status(500).send("Error creating order");
        })
}