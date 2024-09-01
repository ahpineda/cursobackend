/*class Product {
    static currentId = 10;
  
    constructor(title, description, code, price, status, stock, category, thumbnails) {

      this.id = Product.currentId++;
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.status = status;
      this.stock = stock;
      this.category = category;
      this.thumbnails = thumbnails

    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        code: this.code,
        price: this.price,
        status: this.status,
        stock: this.stock,
        category: this.category
      };
    }
  }

  export default Product;
  */

  import mongoose from "mongoose";
  const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number,
    category: String,
    thumbnails: [String]
  })

  const ProductModel = new mongoose.model("products",productSchema);

  export default ProductModel;
  