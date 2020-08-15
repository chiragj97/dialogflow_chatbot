const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },
    owner: { type: String, required: true },
    officialEmail: {
      type: String,
      required: true,
      index: { unique: true },
    },
    contactDetails: { type: Number, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    locality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number, maxlength: 6 },
    password: { type: String, minlength: 6 },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

RestaurantSchema.pre('save', function (next) {
  const restaurant = this;
  if (restaurant.isNew) {
    function encryptPassword() {
      return bcryptjs.genSalt(10).then(function (salt) {
        return bcryptjs
          .hash(restaurant.password, salt)
          .then(function (encryptedPassword) {
            restaurant.password = encryptedPassword;
          });
      });
    }

    // function setRole() {
    //   return User.countDocuments().then(function (count) {
    //     if (count == 0) {
    //       user.roles = 'admin';
    //     }
    //   });
    // }

    return Promise.all([encryptPassword()])
      .then(function (values) {
        next();
      })
      .catch(function (err) {
        return Promise.reject(err.message);
      });
  } else {
    next();
  }
});

// own instance methods
RestaurantSchema.methods.generateToken = function () {
  const restaurant = this;
  const tokenData = {
    _id: restaurant._id,
    email: restaurant.officialEmail,
    createdAt: Number(new Date()),
  };

  const token = jwt.sign(tokenData, 'jwt@123');
  restaurant.tokens.push({
    token,
  });
  return restaurant
    .save()
    .then(function (restaurant) {
      console.log(restaurant);
      return Promise.resolve(token);
    })
    .catch(function (err) {
      console.log(err);
      return Promise.reject(err);
    });
};

// own static method
RestaurantSchema.statics.findByCredentials = function (
  officialEmail,
  password
) {
  const Restaurant = this;
  console.log(officialEmail);
  return Restaurant.findOne({ officialEmail })
    .then(function (restaurant) {
      if (!restaurant) {
        return Promise.reject({ errors: 'Invalid Email / password' });
      }

      return bcryptjs
        .compare(password, restaurant.password)
        .then(function (result) {
          if (result) {
            return Promise.resolve(restaurant);
          } else {
            return Promise.reject({ errors: 'Invalid email / password' });
          }
        });
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
};

RestaurantSchema.statics.findByToken = function (token) {
  const Restaurant = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, 'jwt@123');
  } catch (err) {
    return Promise.reject(err);
  }

  return Restaurant.findOne({ _id: tokenData._id, 'tokens.token': token });
};

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
