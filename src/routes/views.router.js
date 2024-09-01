import { Router } from "express";
const router = Router();
import ProductService from "../service/product.service.js";
const productService = new ProductService();

router.get('/', async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.render("home",{products});
    } catch (error) {
        res.status(500).json({status:"error", message:"interal server error", content:error.message});
    }
});


export default router;