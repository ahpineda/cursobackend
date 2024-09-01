/*class PorductCart {
    static currentId = 1;
  
    constructor(id,quantity) {

      this.id = id
      this.quantity = quantity;

    }
}
export default PorductCart;*/
import mongoose, { Schema } from "mongoose";
import ProductModel from "./product.model";
const ProductCartSchema = new mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: 'ProductModel', required: true },
  quantity: { type: Number, required: true, min: 1 },
})

const ProductCartModel = new mongoose.model("productCart",ProductCartSchema);

export default ProductCartModel;
