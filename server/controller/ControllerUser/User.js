const router = require("express").Router();
const User = require("../../models/User/User");
const Order = require("../../models/Restaurant/OrderSchema");
const authenticateUserAccess = require("../../middleware/authentication");
const sendEmail = require("../../middleware/sendEmail");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res) {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => err.status(400).json("Error " + err));
});

router.post("/add", function (req, res) {
  let body = req.body;
  const user = new User(body);
  user
    .save()
    .then(function (user) {
      res.send(user).json("User Added!");
    })
    .catch(function (err) {
      res.status(400).json("Error:" + err);
    });
});

router.post("/login", function (req, res) {
  console.log("in login function");
  const body = req.body;
  console.log(req.body);
  User.findByCredentials(body.email, body.password)
    .then((user) => {
      const tokenData = {
        _id: user._id,
        email: user.email,
        createdAt: Number(new Date()),
      };

      const token = jwt.sign(tokenData, "jwt@123");
      //   console.log('UserL', user)
      //   return user.generateToken();
      // })
      // .then(function (token) {
      console.log(token);
      // res.setHeader('x-auth', token).send({}) Use this with postman
      res.setHeader("x-auth", token);
      res.send({ token }); //use this for react frontend to store token in localstorage
    })
    .catch(function (err) {
      console.log(err);
      res.send(err);
    });
});

router.put("/addtocart", function (req, res) {
  User.findOneAndUpdate(
    { _id: req.body.userID },
    { $push: { cart: req.body.itemID } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/confirm_order", function (req, res) {
  User.findById(req.body.userID).exec(function (err, doc) {
    doc.cart.map((itemID) => {
      const orderDetails = {
        userID: req.body.userID,
        address: doc.address,
        locality: doc.locality,
        city: doc.city,
        zipcode: doc.zipcode,
        itemID: itemID,
      };
      const order = new Order(orderDetails);
      order.save();
    });
    doc.cart = [];
    doc.save();

    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.post("/send-mail", (req, res) => {
  const email = req.body.email;
  const otp = Math.floor(Math.random() * 1000000 + 54);
  sendEmail(email, otp);
  console.log(typeof otp);
  res.json(otp);
});

router.post("/verifyaccount", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: { accountConfirmation: true } }
  )
    .then(function (user) {
      res.send(user);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.post("/updateaddress", function (req, res) {
  User.findByIdAndUpdate(
    { _id: req.body.userID },
    {
      $set: {
        address: req.body.address,
        locality: req.body.locality,
        zipcode: req.body.zipcode,
        city: req.body.city,
      },
    }
  )
    .then(function (user) {
      res.send(user);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.delete("/logout", function (req, res) {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(function () {
      res.send({ notice: "Successfully logged out" });
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.delete("/logoutAll", authenticateUserAccess, function (req, res) {
  const { user } = req;
  User.findByIdAndUpdate(user._id, { $set: { tokens: [] } })
    .then(function () {
      res.send(user);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.post("/removeitem", function (req, res) {
  User.findByIdAndUpdate(
    { _id: req.body.userID },
    { $pull: { cart: req.body.itemID } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/viewcart", function (req, res) {
  User.findOne({ _id: req.body.userID })
    .populate("cart")
    .then((cart) => {
      console.log(cart);
      res.send(cart);
    })
    .catch((err) => err.status(400).json("Error " + err));
});

router.get("/:id", function (req, res) {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
