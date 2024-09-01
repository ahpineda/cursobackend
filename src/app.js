import express from "express";
import routerCarts from "./routes/carts.router.js";
import routerProducts from "./routes/products.router.js";
import routerViews from "./routes/views.router.js";
import { engine } from "express-handlebars";
import "./database.js";


const app = express();
const port = 8080;

//midleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

//configuramos express handlebars 
app.engine("handlebars", engine());
app.set("view engine","handlebars");
app.set("views", "./src/views");

//routes
app.use("/api/carts", routerCarts);
app.use("/api/products", routerProducts);


//routes views
app.use("/", routerViews);


app.listen(port,()=>{
    console.log(`Escuchando puerto: ${port}`);
});