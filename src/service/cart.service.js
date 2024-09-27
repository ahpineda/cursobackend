import CartModel from '../model/cart.model.js';
import ProductModel from '../model/product.model.js';
import mongoose from 'mongoose';

class CartService {
    async createCart(){
        try {
            const cart = new CartModel({
                products:[]
        });
        const savedCart = await cart.save();
        console.log('New cart created:', savedCart)
        }catch (error){
            throw error;
        }
    }  

    async getCart(idSearch){
        try{
            const cart = await CartModel.findOne({_id:idSearch});
            if (cart) {
               return cart
            } else {
                console.log("Products not found");
            }
        }catch (error){
            throw error
        }
    }

    async addProduct(idCart, idProduct, quantity){
        try{
            const cart = await this.getCart(idCart);
            if (!cart){
                throw new Error("Cart not found");
            }
            const existingProduct = cart.products.find(product => product.product._id.toString() === idProduct); 
            console.log(`estos son los productos del cart ${existingProduct}`);
            if (existingProduct){
                existingProduct.quantity += quantity;
            }else{
                cart.products.push({product:idProduct,quantity:quantity});
            }
            cart.markModified('products');
            await cart.save();
            return cart;
        }catch (error){
            throw error;
        }
    }

 
}

export default CartService;