import { promises as fs } from 'fs';

class ProductService {
    constructor(){
        this.filePath='./src/fileSystem/products.json';
    }
           
    async getProducts(){
            try {
              const data = await fs.readFile(this.filePath, 'utf8');
              return JSON.parse(data) || [];
            } catch (error) {
              throw error;
            }
        }
    
    async getProductById(id){
        try{
            const products = await this.getProducts();
            if (products){
                return products.find((product => product.id == id));
            }else{
                throw new Error(`id:${id} not found`)
            }
        } catch (error) {
            throw error;
        }        
    }

    async deleteProduct(id){
        try{
            const products = await this.getProducts();
            const newProducts = products.filter(product => product.id != id);
            if (products.length === newProducts.length) {
                throw new Error('Product not found.');
              }
            await fs.writeFile(this.filePath, JSON.stringify(newProducts, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }          
    }

    async updateProduct(id,updateProduct){
        try{
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id == id);
            if (index !== -1) {
              products[index] = { ...products[index], ...updateProduct };
              await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf8');
            } else {
              throw new Error('Product not found.');
            }
        }catch (error){
            throw error;
        }
    }

    async addProduct(product) { 
        try {
            const products = await this.getProducts();       
            products.push(product);
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }
    }
}

export default ProductService;