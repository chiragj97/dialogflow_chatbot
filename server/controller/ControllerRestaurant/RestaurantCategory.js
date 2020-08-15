const router = require('express').Router();
const RestaurantCategory = require('../../models/Restaurant/RestaurantCategory');

router.post('/addcategory', function (req, res) {
  let categories = {
    categoryName: req.body.categoryName,
    restaurantID: req.body.restaurantID,
  };
  const restaurantcategory = new RestaurantCategory(categories);
  RestaurantCategory.findOne({
    restaurantID: categories.restaurantID,
    categoryName: categories.categoryName,
  })
    .exec()
    .then((category) => {
      if (!category) {
        restaurantcategory
          .save()
          .then(function (restaurantcategory) {
            res.send(restaurantcategory).json('Category Added!');
          })
          .catch(function (err) {
            res.status(400).json('Error:' + err);
          });
      } else res.json('Already exist!');
    });
});

router.put('/updatecategory', function (req, res) {
  RestaurantCategory.findOneAndUpdate(
    { _id: req.body.categoryID },
    { $push: { itemID: req.body.itemID } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get('/getcategories', function (req, res) {
  RestaurantCategory.find({})
    .populate('restaurantID')
    .then((restaurantcategories) => res.json(restaurantcategories))
    .catch((err) => err.status(400).json('Error ' + err));
});

router.post('/getcategory', function (req, res) {
  RestaurantCategory.findOne({
    restaurantID: req.body.restaurantID,
    categoryName: req.body.categoryName,
  })
    .then((category) => res.json(category))
    .catch((err) => err.status(400).json('Error ' + err));
});

module.exports = router;
