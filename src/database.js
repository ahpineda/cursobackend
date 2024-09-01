import mongoose from "mongoose";
mongoose.connect("mongodb+srv://alejandrohectorpineda:1234@cluster0.g7eki.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
                .then(()=>console.log("Conectado a DB"))
                .catch(()=>console.log("Error al conectar con DB"));