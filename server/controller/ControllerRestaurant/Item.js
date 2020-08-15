const router = require('express').Router();
const Item = require('../../models/Restaurant/ItemSchema');
const RestaurantCategory = require('./RestaurantCategory');

router.post('/add_item', function (req, res) {
  let body = req.body;
  const item = new Item(body);
  Item.findOne({ restaurantID: body.restaurantID, itemName: body.itemName })
    .exec()
    .then((product) => {
      if (!product) {
        item
          .save()
          .then(function (item) {
            res.send(item).json('Item Added!');
          })
          .catch(function (err) {
            res.status(400).json('Error: ' + err);
          });
      } else res.json('Already exist!');
    });
});

router.get('/get_items', function (req, res) {
  Item.find({})
    .populate('categoryID')
    .then((items) => res.json(items))
    .catch((err) => err.status(400).json('Error ' + err));
});

router.post('/updateitem', function (req, res) {
  Item.findOneAndUpdate(
    { _id: req.body.itemID },
    { isAdded: req.body.isAdded },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/addtocart', function (req, res) {
  Item.find({ itemName: req.body.dish })
    .populate('restaurantID', 'restaurantName')
    .then((restaurants) => res.json(restaurants))
    .catch((err) => err.status(400).json('Error ' + err));
});

// router.post('/getitem', function (req, res) {
//   Item.find({ itemName: req.body.dish })
//     .populate('restaurantID', 'restaurantName')
//     .then((item) => res.json(item))
//     .catch((err) => err.status(400).json('Error ' + err));
// });

router.get('/:id', function (req, res) {
  Item.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
