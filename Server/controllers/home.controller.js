import productModel from '../models/product.model.js'
import errorMessage from '../helpers/error.message.helper.js';
import product from '../entities/product.entity.js';

async function getHomeProduct(){
    try {
        let hotProduct = await productModel.getHotProduct()
        let newProduct = await productModel.getNewProduct()
        
        let res = {
            hot: hotProduct,
            new: newProduct
        }
        return res
    } catch (error) {
        return errorMessage(err)
    }
}

export default {
    getHomeProduct,
}