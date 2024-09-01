import { Router } from "express";
import ProductService from "../service/product.service.js";
const router = Router();
//DATA
import Product from "../model/product.model.js" 

const productService = new ProductService();

router.get('/', async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.send({status:"success",content:products});
    } catch (error) {
        res.status(500).json({status:"error", message:"interal server error", content:error.message});
    }
});

router.post("/", async (req,res)=>{
    try{
        const { title,description,code,price,stock,category, thumbnails} = req.body;
        if (!title || !description || !code || price === undefined || stock === undefined || !category) {
            res.status(400).send({status:"error",message:"bad request", content:"all fields are required"});
        }
        // const newProduct = new Product(title, description, code, price, true, stock, category,thumbnails);
        await productService.addProduct(req.body);
        res.send({status:"success",message:"product successfully added"});
    }catch (error){
        res.status(500).send({status:"error", message:"interal server error", content:error.message})
    }    
})

router.get("/:id", async (req,res)=>{
    let {id} = req.params;
    const product = await productService.getProductById(id);
    try{
        if (product){
            res.send({status:"success",content:product});
        }else{
            res.status(404).send({status:"not found",message:"resource not found"});
        }
    }catch (error){
        res.status(500).send({status:"error", message:"interal server error", content:error.message})
    }    
})


router.put("/:id", async (req,res)=>{
    try{
        let {id} = req.params;
        let { title,description,code,price,stock,category, thumbnails} = req.body;      
        if (!title || !description || !code || price === undefined || stock === undefined || !category) {
            res.status(400).send({status:"error",message:"bad request", content:error.message});
        }
        await productService.updateProduct(id,req.body);
        res.send({status:"success",message:"successfully modified product"});
    }catch(error){
        res.status(500).send({status:"error", message:"interal server error",content:error.message});
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        let {id} = req.params;
        await productService.deleteProduct(id);
        res.send({status:"success",message:"product successfully removed"});
    }catch(error){
        res.status(500).send({status:"error", message:"interal server error",content:error.message})
    }
})

export default router;