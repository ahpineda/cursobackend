import CartModel from '../model/cart.model.js';

class CartService {
    // constructor(){
    //     this.filePath='./src/fileSystem/carts.json';
    // }

    async createCart(){
        try {
            const carts = await this.getCarts();
            carts.push(new Cart())
            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2), 'utf8');
        } catch (error) {
          throw error;
        }
    }  

    async getCarts(){
        // try{
        //     const data = await fs.readFile(this.filePath, 'utf8');
        //     return JSON.parse(data); 
        // }catch (error){
        //     throw error
        // }
        try{
            const data = await CartModel.find().lean();
            return data;
        }catch (error){
            throw error;
        }
    }

    async getCart(idSearch){
        // try {
        //     const carts= await this.getCarts();
        //     const cart = carts.find(cart=>cart.id==cid)
        //     if (cart){
        //         return cart.products;
        //     }else{
        //         throw new Error ("Cart not found");
        //     }          
        // } catch (error) {
        //   throw error;
        // }
        try{
            const result = await CartModel.find({id:idSearch})
            if (result) {
               return result.products
            } else {
                console.log("Product not found");
            }
        }catch (error){
            throw error
        }
    }

    async addProduct(cid, product){
        try{
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id == cid);
            if (cartIndex !== -1) {
              const itemIndex = carts[cartIndex].products.findIndex(cartItem => cartItem.id == product.id);
              if (itemIndex !== -1) {
                carts[cartIndex].products[itemIndex].quantity += product.quantity;
              } else {
                carts[cartIndex].products.push(product);
              }
              await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2), 'utf8');
            } else {
              throw new Error('Cart not found.');
            }
        }catch (error){
            throw error;
        }
    }

 
}

export default CartService;