import Category from '../entities/category.entity.js';
import Product from '../entities/product.entity.js';

function getAllCategories() {
    return new Promise((res, rej) => {
        Category.find()
        .exec((err, data) => {
            if (err) rej(err)
            if (data) res(data)
            res(null)
        })
    })
}

function createCategory(newCategory){
    return new Promise((res, rej) => {
        newCategory.save((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}

function getCategorytDetailByID(id) {
    return new Promise((res, rej) => {
        Category.findById(id)
        .exec((err, data) => {
            if (err) rej(err)
            if (data) res(data)
            res(null)
        })
    })
}

function updateCategory(id, update){
    return new Promise((res, rej) => {
        Category.findByIdAndUpdate(id, update).exec((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}

function deleteCategory(id){
    return new Promise((res, rej) => {
        Category.findByIdAndDelete(id).exec((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}


export default {
    getAllCategories,
    createCategory,
    getCategorytDetailByID,
    updateCategory,
    deleteCategory,
}