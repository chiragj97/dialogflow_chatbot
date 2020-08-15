const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: String,
  menuType: String,
  description: String,
  price: Number,
  isAdded: Boolean,
  restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  categoryID: { type: Schema.Types.ObjectId, ref: 'RestaurantCategory' },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
