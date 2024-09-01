/*class Cart {
    static currentId = 1;
  
    constructor() {
      this.id = Cart.currentId++;
      this.products = [];

    }
}
export default Cart;*/
import mongoose, { Schema } from "mongoose";
const cartSchema = new mongoose.Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'ProductCart' }]
})

const CartModel = new mongoose.model("cart",cartSchema);

export default CartModel;
