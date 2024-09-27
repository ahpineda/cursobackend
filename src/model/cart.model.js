import mongoose, { Schema } from "mongoose";
const cartSchema = new mongoose.Schema({
  products: [
    {
      product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'products',
        required: true
      },
      quantity:{
        type: Number,
        required: true
      }
    }
  ]

});
cartSchema.pre('findOne', function () {
  this.populate('products.product');
});

const CartModel = mongoose.model('carts', cartSchema);

export default CartModel;
