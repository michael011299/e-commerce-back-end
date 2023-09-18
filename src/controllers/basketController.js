const basketService = require('../services/basketService.js');

exports.getBaskets = (req, res) => {
    basketService.getBaskets()
        .then((baskets) => {
            res.json(baskets);
        })
        .catch((error) => {
            console.error('Error getting baskets:', error);
            res.status(500).send('Error getting baskets');
        });
};

exports.getBasketByUser = (req, res) => {
    const { user_id } = req.params;
    basketService.getBasketByUser(user_id)
        .then((basket) => {
            res.json(basket);
        })
        .catch((error) => {
            console.error('Error getting basket:', error);
            res.status(500).send('Error getting basket');
        });
};

exports.createBasket = (req, res) => {
    basketService.createBasket(req.body.user_id)
        .then(() => {
            console.log('Basket created successfully');
            res.sendStatus(201);
        })
        .catch((error) => {
            console.error('Error creating basket:', error);
            res.status(500).send('Error creating basket');
        });
};

exports.addToBasket = (req, res) => {
    basketService.addToBasket(req.body.productToSend, req.body.user_id)
        .then(() => {
            console.log('Item added successfully');
            res.sendStatus(201);
        })
        .catch((error) => {
            console.error('Error adding item:', error);
            res.status(500).send('Error adding item');
        });
};

exports.removeItem = (req, res) => {
    basketService.removeItem(req.body.user_id, req.body.product).then(() => {
        console.log('Item removed successfully')
        res.sendStatus(202)
    }).catch((error) => {
        console.error("Error removing item:", error)
        res.status(500).send('Error removing item')
    })
}

exports.clear = (req, res) => {
    const { user_id } = req.params
    console.log(user_id)
    basketService.clear(user_id).then(() => {
        console.log('Basket cleared successfully')
        res.sendStatus(202)
    }).catch((error) => {
        console.log("here")
        console.error("Error removing item:", error)
        res.status(500).send('Error removing item')
    })

}



