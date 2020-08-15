const router = require('express').Router();
const Menu = require('../../models/Restaurant/Menu');

router.put('/addmenu', function (req, res) {
  Menu.findOneAndUpdate(
    { restaurantID: req.body.restaurantID },
    { $addToSet: { menu: req.body.categoryID } },
    { upsert: true },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/show_restaurantmenu', function (req, res) {
  Menu.findOne({
    restaurantID: req.body.restaurantID,
  })
    .populate({
      path: 'menu',
      populate: {
        path: 'itemID',
        model: 'Item',
        populate: {
          path: 'restaurantID',
          model: 'Restaurant',
        },
      },
    })
    .then((category) => res.json(category))
    .catch((err) => err.status(400).json('Error ' + err));
});

router.get('/showmenu', function (req, res) {
  Menu.find({})
    .populate({
      path: 'menu',
      populate: {
        path: 'restaurantID',
        model: 'Restaurant',
      },
    })
    .then((menu) => res.json(menu))
    .catch((err) => err.status(400).json('Error ' + err));
});

module.exports = router;
