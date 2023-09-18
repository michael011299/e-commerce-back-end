const addressService = require("../services/addressService.js");

exports.getAddress = (req, res) => {
  const { user_id } = req.params;
  addressService
    .getAddress(user_id)
    .then((address) => {
      res.json(address);
    })
    .catch((error) => {
      console.error("Error getting address:", error);
      res.status(500).send("Error getting address");
    });
};

exports.createAddress = (req, res) => {
  const user_id = req.body.user_id;
  const house_num = req.body.house_num;
  const postcode = req.body.postcode;
  const street_name = req.body.street_name;
  const town = req.body.town;
  addressService
    .createAddress(user_id, house_num, postcode, street_name, town)
    .then((wishlist) => {
      res.json(wishlist);
    })
    .catch((error) => {
      console.error("Error getting wishlist:", error);
      res.status(500).send("Error getting wishlist");
    });
};

exports.removeAddress = (req, res) => {
  addressService.removeAddress(req.body.address_id).then(() => {
    console.log('Address removed successfully')
    res.sendStatus(202)
}).catch((error) => {
    console.error("Error removing address:", error)
    res.status(500).send('Error removing address')
})
}

exports.updateAddress = (req, res) => {
  console.log(req.body.address_id)
  addressService.updateAddress(req.body.address_id, req.body.house_num, req.body.postcode, req.body.street_name, req.body.town).then(() => {
    console.log("Address updated successfully")
    res.sendStatus(204)
  }).catch((error) => {
    console.error("Error updating address:", error)
    res.status(500).send('Error updating address')
})
}