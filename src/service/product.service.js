import ProductModel from "../model/product.model.js"
class ProductService {
    async getProducts(){
            try {
               const data = await ProductModel.find().lean();
               return data;
             } catch (error) {
               throw error;
             }            
        }
    
    async getProductById(idSearch){
       try {
            const data = await ProductModel.findById(idSearch).lean(); 
            return data
       } catch (error) {
            throw error;

       }       
    }

    async deleteProduct(idDelete){  
        try {
            const result = await ProductModel.deleteOne({_id:idDelete});
            if (result.deletedCount == 0){
                throw new Error("Product not found")
            }            
        } catch (error){
            throw error;
        }   
    }

    async updateProduct(idUpdate,updateProduct){
        try{
            const result = await ProductModel.updateOne({_id:idUpdate},{
                title: updateProduct.title,
                description: updateProduct.description,
                price: updateProduct.price,
                stock: updateProduct.stock,
                status: updateProduct.status,
                category: updateProduct.category,
                thumbnails: updateProduct.thumbnails
            })
            if (result.nModified === 0){
                throw new Error("Product not found")
            }             
        }catch (error){
            throw error;
        }
    }

    async addProduct(newProduct) { 

        try {
            const product = new ProductModel({
                title:newProduct.title,
                description:newProduct.description,
                code: newProduct.code,
                price: newProduct.price,
                status: newProduct.status,
                stock: newProduct.stock,
                category: newProduct.category,
                thumbnails:newProduct.thumbnails
        });
        const savedProduct = await product.save();
        console.log('New product saved:', savedProduct)
        }catch (error){
            throw error;
        }
    }
}

export default ProductService;