const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantCategorySchema = new Schema({
  restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  categoryName: {
    type: String,
    required: true,
  },
  itemID: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

RestaurantCategorySchema.index(
  { restaurantID: 1, categoryName: 1 },
  { unique: true }
);

const RestaurantCategory = mongoose.model(
  'RestaurantCategory',
  RestaurantCategorySchema
);

module.exports = RestaurantCategory;
