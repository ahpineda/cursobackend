import express from "express";
import routerCarts from "./routes/carts.router.js";
import routerProducts from "./routes/products.router.js";

const app = express();
app.use(express.json());

const PORT = 8080;

//routes
app.use("/api/carts", routerCarts);
app.use("/api/products", routerProducts);

app.listen(PORT,()=>{
    console.log(`Escuchando puerto: ${PORT}`);
});