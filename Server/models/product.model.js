import product from '../entities/product.entity.js';

function getAllProducts() {
    return new Promise((res, rej) => {
        product.find()
        .populate('category', 'name')
        .populate('author', 'name')
        .populate('publisher', 'name')
        .exec((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}

function createProduct(newProduct){
    return new Promise((res, rej) => {
        newProduct.save((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}
function getProductByID(id){
    return new Promise((res, rej) => {
        product.findById(id)
        .exec((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}
function getProductDetailByID(id){
    return new Promise((res, rej) => {
        product.findById(id)
        .populate('category', 'name')
        .populate('author', 'name')
        .populate('publisher', 'name')
        .exec((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}

function updateProduct(id, update){
    return new Promise((res, rej) => {
        product.findByIdAndUpdate(id, update).exec((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}

function countProductByCategory(id) {
    return new Promise((res, rej) => {
        product.find({category: id}).exec(function (err, results) {
            var count = results.length
            res(count)
        })
    })
}

function getProductsByCategory(categoryID) {
    return new Promise((res, rej) => {
        product.find({category: categoryID})
        .exec(function (err, data) {
            if (err) rej(err)
            res({Record: data.length, products: data})
        })
    })
}

function getHotProduct(){
    return new Promise((res, rej) => {
        product.find({hot: true}).limit(4).exec(function (err, data) {
            if (err) rej(err)
            res(data)
        })
    })
}

function getNewProduct(){
    return new Promise((res, rej) => {
        product.find().sort({createdAt: -1}).limit(4).exec(function (err, data) {
            if (err) rej(err)
            res(data)
        })
    })
}

function search(name) {
    
    let filters = {
        name : { $regex: name, $options: 'i' },
        // price: { $gt: min, $lt: max },
        // createdAt: { $gte: form, $lte: to }
    };   
    return new Promise((res, rej) => {
        product.find(filters)
            .populate('category', 'name')
            .populate('author', 'name')
            .populate('publisher', 'name')
            // .populate({
            //     path: 'category',
            //     match: { name : { $regex: category, $options: 'i' }},
            //     select: 'name -_id'
            // })            
            // .populate({
            //     path: 'author',
            //     match: { name: { $regex: author, $options: 'i' }},
            //     select: 'name -_id'
            // })
            // .populate({
            //     path: 'publisher',
            //     match: { name: { $regex: publisher, $options: 'i' }},
            //     select: 'name -_id'
            // })
            //.limit(2)
            // .sort({ price: 1 })
            .exec(function (err, results) {
                // results = results.filter((user) => {
                //     return (user.category && user.author && user.publisher);
                // });              
                if (err) rej(err);
                res(results);
        })
    })
}

export default {
    getAllProducts,
    createProduct,
    getProductDetailByID,
    getProductByID,
    updateProduct,
    countProductByCategory,
    getProductsByCategory,
    getHotProduct,
    getNewProduct,
    search
}
