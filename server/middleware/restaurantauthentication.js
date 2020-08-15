const Restaurant = require('../models/Restaurant/Restaurant');

const authenticateRestaurantAccess = function (req, res, next) {
  const token = req.header('x-auth');
  Restaurant.findByToken(token)
    .then(function (restaurant) {
      if (restaurant) {
        req.restaurant = restaurant;
        req.token = token;

        next();
      } else {
        res.status('401').send({ notice: 'Token not available' });
      }
    })
    .catch(function (err) {
      res.status('401').send(err);
    });
};

module.exports = authenticateRestaurantAccess;
