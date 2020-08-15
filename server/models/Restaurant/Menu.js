const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  menu: [
    {
      type: Schema.Types.ObjectId,
      ref: 'RestaurantCategory',
      index: { unique: true },
    },
  ],
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
