class Product {
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
  
  