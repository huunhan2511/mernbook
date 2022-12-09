import categoryModel from '../models/category.model.js'
import productModels from '../models/product.model.js'
import Category from '../entities/category.entity.js'
import errorMessage from '../helpers/error.message.helper.js';

function getAllCategories() {
    try {
        let categories = categoryModel.getAllCategories()
        return categories;
    } catch (err) {
        return errorMessage(err);
    }
}

async function createCategory(name) {
    try {
        let newCategory = new Category({
            "name": name,
        })
        let err = newCategory.validateSync()
        if (err) return errorMessage(err) 
        let category = await categoryModel.createCategory(newCategory)
        return {Message : 'Tạo thể loại thành công'}
    } catch (err) {
        return errorMessage(err);
    }
}

function getCategorytDetailByID(id){
    try {
        let category = categoryModel.getCategorytDetailByID(id)
        return category
    } catch (err) {
        return errorMessage(err);
    }
}

async function updateCategory(id, update){
    try {
        let category = categoryModel.updateCategory(id, update)
        return {Message : 'Cập nhật thể loại thành công'};
    } catch (err) {
        return errorMessage(err);
    }
}

async function deleteCategory(id) {
    try {
        let count
        await countProductByCategory(id).then((result) => {
            count = result
        })
        if(count==0){
            let category = categoryModel.deleteCategory(id)
            return {Message : 'Xóa thể loại thành công'}
        } else {
            return ({Message: "Thể loại đã tồn sản phẩm, không thể xóa."})
        }
    } catch (err) {
        return errorMessage(err);
    }
}

function countProductByCategory(id){
    try {
        let products = productModels.countProductByCategory(id)
        return products
    } catch (err) {
        return errorMessage(err);
    }
}

export default {
    getAllCategories,
    createCategory,
    getCategorytDetailByID,
    updateCategory,
    deleteCategory,
    countProductByCategory,
}