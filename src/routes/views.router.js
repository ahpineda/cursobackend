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

router.get('/products', async (req, res) => {
    try {
        let limit = req.query.limit || 10;
        let page = req.query.page || 1;
        const products = await productService.getProductsPaginated(limit,page);
        console.log(products);
        const productsFinal = products.docs.map(product=>{
            const {_id,...rest} = product.toObject();
            return rest;
        })
        console.log(productsFinal);
        res.render("products",{
            products:productsFinal,
            hasPrevPage:products.hasPrevPage,
            hasNextPage:products.hasNextPage,
            prevPage:products.prevPage,
            nextPage:products.nextPage,
            currentPage:products.page,
            totalPages:products.totalPages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error", message:"interal server error", content:error.message});
    }
});


export default router;