class Cart {
    static currentId = 1;
  
    constructor() {
      this.id = Cart.currentId++;
      this.products = [];

    }
}
export default Cart;
