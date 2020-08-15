const router = require('express').Router();
const Restaurant = require('../../models/Restaurant/Restaurant');
const authenticateRestaurantAccess = require('../../middleware/restaurantauthentication');

router.post('/add', function (req, res) {
  let restaurantDetails = {
    restaurantName: req.body.restaurantName,
    owner: req.body.owner,
    officialEmail: req.body.officialEmail,
    contactDetails: req.body.contactDetails,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    locality: req.body.locality,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    password: req.body.password,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  const restaurant = new Restaurant(restaurantDetails);
  restaurant
    .save()
    .then(function (restaurant) {
      res.send(restaurant).json('Restaurant Added!');
    })
    .catch(function (err) {
      res.status(400).json('Error:' + err);
    });
});

router.post('/login', function (req, res) {
  console.log('in login function');
  const body = req.body;
  Restaurant.findByCredentials(body.officialEmail, body.password)
    .then(function (restaurant) {
      return restaurant.generateToken();
    })
    .then(function (token) {
      // res.setHeader('x-auth', token).send({}) Use this with postman
      res.setHeader('x-auth', token);
      res.send({ token }); //use this for react frontend to store token in localstorage
    })

    .catch(function (err) {
      res.send(err);
    });
  console.log('outside');
});

router.delete('/logout', function (req, res) {
  const { restaurant, token } = req;
  Restaurant.findByIdAndUpdate(restaurant._id, {
    $pull: { tokens: { token: token } },
  })
    .then(function () {
      res.send({ notice: 'Successfully logged out' });
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.delete('/logoutAll', authenticateRestaurantAccess, function (req, res) {
  const { restaurant } = req;
  Restaurant.findByIdAndUpdate(restaurant._id, { $set: { tokens: [] } })
    .then(function () {
      res.send(restaurant);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.get('/', function (req, res) {
  Restaurant.find({})
    .then((restaurants) => res.json(restaurants))
    .catch((err) => err.status(400).json('Error ' + err));
});

router.get('/:id', function (req, res) {
  Restaurant.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
