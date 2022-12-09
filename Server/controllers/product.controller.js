import productModel from '../models/product.model.js'
import Product from '../entities/product.entity.js'
import errorMessage from '../helpers/error.message.helper.js';

function getAllProducts() {
    try {
        let products = productModel.getAllProducts()
        return products
    } catch (err) {
        return errorMessage(err);
    }
}

async function createProduct(name, price, category, author, publisher, printLength, stock, hot, description, image){
    try {
        let newProduct = new Product({
            "name": name,
            "price": price,
            "category": category,
            "author": author,
            "publisher": publisher,
            "printLength": printLength,
            "stock": stock,
            "hot": hot,
            "description": description,
            "image": image,
        })
        let err = newProduct.validateSync()
        if (err) return errorMessage(err)      
        let product = await productModel.createProduct(newProduct)
        return {Message : 'Tạo sản phẩm thành công'};
    } catch (err) {
        return errorMessage(err)
    }
}

function getProductDetailByID(id){
    try {
        let product = productModel.getProductDetailByID(id)
        return product
    } catch (err) {
        return errorMessage(err)
    }
}

async function updateProduct(id, update){
    try {
        let product = productModel.updateProduct(id, update)
        return {Message : 'Cập nhật sản phẩm thành công'};
    } catch (error) {
        return errorMessage(err)
    }
}

async function search(name){
    try {     
        return await productModel.search(name);
    } catch (error) {
        return errorMessage(err);
    }
}

function getProductsByCategory(categoryId){
    try {
        return productModel.getProductsByCategory(categoryId)
    } catch (error) {
        return errorMessage(err);
    }
}
export default {
    getAllProducts,
    createProduct,
    getProductDetailByID,
    updateProduct,
    search,
    getProductsByCategory,
}
