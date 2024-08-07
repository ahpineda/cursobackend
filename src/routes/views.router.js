import { Router } from "express";
import { Server } from "socket.io";
const router = Router();
import ProductService from "../service/product.service.js";
const productService = new ProductService();
/*const io = new Server(httpServer);*/

router.get('/', async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.render("home",{products});
    } catch (error) {
        res.status(500).json({status:"error", message:"interal server error", content:error.message});
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.render("realTimeProducts",{products});
    } catch (error) {
        res.status(500).json({status:"error", message:"interal server error", content:error.message});
    }
});

/*io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');
    const products = await productService.getProducts();

    socket.emit('updateProducts', products);

    socket.on('addProduct', (product) => {
        
        products.push(product);
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', (productCode) => {
        products = products.filter(product => product.code !== productCode);
        io.emit('updateProducts', products);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});*/

export default router;