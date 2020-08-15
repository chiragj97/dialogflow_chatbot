const router = require('express').Router();
const Order = require('../../models/Restaurant/OrderSchema');
const User = require('../../models/User/User');

router.get('/display_orders', function (req, res) {
  Order.find({})
    .sort('-createdAt')
    .populate('userID', 'firstName')
    .populate('itemID', 'restaurantID itemName price')
    .then((orders) => res.send(orders))
    .catch((err) => err.status(400).json('Error ' + err));
});

router.get('/display_customers', function (req, res) {
  Order.find()
    .distinct('userID', function (error, userID) {
      User.find({ _id: { $in: userID } }, function (err, result) {
        res.send(result);
      });
    })
    .catch((err) => err.status(400).json('Error ' + err));
});

router.post('/userorders', function (req, res) {
  Order.find({ userID: req.body.userID })
    .populate({
      path: 'itemID',
      model: 'Item',
      select: { itemName: 1, price: 1, menuType: 1 },
      populate: {
        path: 'restaurantID',
        model: 'Restaurant',
        select: { restaurantName: 1 },
      },
    })
    .then((order) => res.json(order))
    .catch((err) => err.status(400).json('Error ' + err));
});

router.post('/confirmorder', function (req, res) {
  Order.findByIdAndUpdate(
    { _id: req.body.orderID },
    {
      $set: {
        orderConfirmed: 'Confirmed',
      },
    }
  )
    .then(function (order) {
      res.send(order);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.post('/cancelorder', function (req, res) {
  Order.findByIdAndUpdate(
    { _id: req.body.orderID },
    {
      $set: {
        orderConfirmed: 'Cancelled',
      },
    }
  )
    .then(function (order) {
      res.send(order);
    })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = router;
