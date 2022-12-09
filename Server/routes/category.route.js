import express from 'express'
import categoryCtrl from '../controllers/category.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router()

router.get('/', getAllCategories)
router.post('/', authMiddleware.isAdmin, createCategory)
router.get('/:id', authMiddleware.isAdmin, getCategorytDetail)
router.patch('/:id', authMiddleware.isAdmin, updateCategory)
router.delete('/:id', authMiddleware.isAdmin, deleteCategory)
router.get('/count/:id', authMiddleware.isAdmin, countProductByCategory)

function getAllCategories(req, res) {
    categoryCtrl.getAllCategories().then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

function createCategory(req, res) {
    let name = req.body.name
    categoryCtrl.createCategory(name).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

function getCategorytDetail(req, res){
    var id = req.params.id
    categoryCtrl.getCategorytDetailByID(id).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

function updateCategory(req, res){
    var id = req.params.id
    let update = req.body
    categoryCtrl.updateCategory(id, update).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

function deleteCategory(req, res){
    var id = req.params.id
    categoryCtrl.deleteCategory(id).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

function countProductByCategory(req, res){
    var id = req.params.id
    categoryCtrl.countProductByCategory(id).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

export default router