const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    mobile: { type: Number, required: true, minlength: 10, maxlength: 10 },
    password: { type: String, required: true, minLength: 8 },
    address: { type: String },
    locality: { type: String },
    city: { type: String },
    zipcode: { type: Number, maxlength: 6 },
    accountConfirmation: { type: Boolean, default: false },
    cart: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isNew) {
    function encryptPassword() {
      return bcryptjs.genSalt(10).then(function (salt) {
        return bcryptjs
          .hash(user.password, salt)
          .then(function (encryptedPassword) {
            user.password = encryptedPassword;
          });
      });
    }

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
userSchema.methods.generateToken = () => {
  let user = this;
  console.log('User',user)
  const tokenData = {
    _id: user._id,
    email: user.email,
    createdAt: Number(new Date()),
  };

  const token = jwt.sign(tokenData, 'jwt@123');
  console.log(token)
  // user.tokens.push({
  //   token,
  // });
  return user
  //   .save()
  //   .then(function (user) {
  //     return Promise.resolve(token);
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //     return Promise.reject(err);
  //   });
};

// own static method
userSchema.statics.findByCredentials = function (email, password) {
  const User = this;
  return User.findOne({ email })
    .then(function (user) {
      if (!user) {
        return Promise.reject({ errors: 'Invalid Email / password' });
      }

      return bcryptjs.compare(password, user.password).then(function (result) {
        if (result) {
          return Promise.resolve(user);
        } else {
          return Promise.reject({ errors: 'Invalid email / password' });
        }
      });
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function (token) {
  const User = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, 'jwt@123');
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({ _id: tokenData._id, 'tokens.token': token });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
