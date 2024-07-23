import { Router } from "express";
import CartService from "../service/cart.service.js";
import PorductCart from "../model/product.model.js";
const cartService = new CartService();
const router = Router();

router.post("/", async (req,res)=>{
    try{
        cartService.createCart()
        //ToDo: guardar cart con filesystem
        res.send({status:"success",message:"cart created"});
    }catch (error){
        res.status(500).send({status:"error", message:"interal server error", content:error.message})        
    }
})

router.get("/:cid", async (req,res)=>{
    try{
        let { cid } = req.params;
        const products = await cartService.getCart(cid);
        res.send({status:"success",content:products});
    }catch (error){
        res.status(500).send({status:"error", message:"interal server error", content:error.message})
    }    
})

router.post("/:cid/product/:pid", (req,res)=>{
    try{
        let { cid } = req.params;
        let { pid } = req.params; 
        cartService.addProduct(cid,new PorductCart(pid,1));
        res.send({status:"success",message:"product added to cart successfully"});
    }catch (error){
        res.status(500).send({status:"error", message:"interal server error", content:error.message})        
    }
})

export default router;