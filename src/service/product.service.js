import ProductModel from "../model/product.model.js"

class ProductService {
    // constructor(){
    //     this.filePath='./src/fileSystem/products.json';
    // }
    static currentId = 11;       
    async getProducts(){
            // try {
            //   const data = await fs.readFile(this.filePath, 'utf8');
            //   return JSON.parse(data) || [];
            // } catch (error) {
            //   throw error;
            // }
            try {
               const data = await ProductModel.find().lean();
               return data;
             } catch (error) {
               throw error;
             }            
        }
    
    async getProductById(idSearch){
        // try{
        //     const products = await this.getProducts();
        //     if (products){
        //         return products.find((product => product.id == id));
        //     }else{
        //         throw new Error(`id:${id} not found`)
        //     }
        // } catch (error) {
        //     throw error;
        // } 
       try {
            const data = await ProductModel.find({id:idSearch}).lean();
            return data
       } catch (error) {
            throw error;

       }       
    }

    async deleteProduct(idDelete){
        // try{
        //     const products = await this.getProducts();
        //     const newProducts = products.filter(product => product.id != id);
        //     if (products.length === newProducts.length) {
        //         throw new Error('Product not found.');
        //       }
        // } catch (error) {
        //     throw error;
        // }     
        try {
            const result = await ProductModel.deleteOne({id:idDelete});
            if (result.deletedCount == 0){
                throw new Error("Product not found")
            }            
        } catch (error){
            throw error;
        }   
    }

    async updateProduct(idUpdate,updateProduct){
        // try{
        //     const products = await this.getProducts();
        //     const index = products.findIndex(product => product.id == id);
        //     if (index !== -1) {
        //       products[index] = { ...products[index], ...updateProduct };
        //       await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf8');
        //     } else {
        //       throw new Error('Product not found.');
        //     }
        // }catch (error){
        //     throw error;
        // }
        try{
            const result = await ProductModel.updateOne({id:idUpdate},{
                title:updateProduct.title,
                description:updateProduct.description,
                price:updateProduct.price,
                status:updateProduct.status,
                stock:updateProduct.stock,
                category:updateProduct.category,
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
        // try {
        //     const products = await this.getProducts();       
        //     products.push(product);
        //     await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf8');
        // } catch (error) {
        //     throw error;
        // }
        try {
            const product = new ProductModel({
                id: ProductService.currentId++,
                title : newProduct.title,
                description : newProduct.description,
                code: newProduct.code,
                price: newProduct.price,
                status: newProduct.status,
                stock: newProduct.stock,
                category: newProduct.category,
                thumbnails: newProduct.thumbnails
        });
        const savedProduct = await product.save();
        console.log('New product saved:', savedProduct)
        }catch (error){
            throw error;
        }
    }
}

export default ProductService;