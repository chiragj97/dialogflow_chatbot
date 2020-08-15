const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    address: { type: String },
    locality: { type: String },
    city: { type: String },
    zipcode: { type: Number },
    orderConfirmed: { type: String, default: 'Pending' },
    itemID: { type: Schema.Types.ObjectId, ref: 'Item' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
