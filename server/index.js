const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully !');
});

const restaurantCategoryRouter = require('./controller/ControllerRestaurant/RestaurantCategory');
const itemRouter = require('./controller/ControllerRestaurant/Item');
const restaurantRouter = require('./controller/ControllerRestaurant/Restaurant');
const menuRouter = require('./controller/ControllerRestaurant/Menu');
const orderRouter = require('./controller/ControllerRestaurant/Order');

app.use('/restaurant', restaurantRouter);
app.use('/restaurantcategory', restaurantCategoryRouter);
app.use('/items', itemRouter);
app.use('/menu', menuRouter);
app.use('/orders', orderRouter);

const userRouter = require('./controller/ControllerUser/User');
app.use('/userRegistration', userRouter);

app.listen(port, () => {
  console.log(`Server started running on port : ${port}`);
});
