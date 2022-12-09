import express from 'express';
import authorController from '../controllers/author.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const authorRouter = express.Router();

authorRouter.get('/', getAllAuthor);
authorRouter.get('/:id', authMiddleware.isAdmin, getAuthorByID);
authorRouter.post('/', authMiddleware.isAdmin, create);
authorRouter.patch('/:id', authMiddleware.isAdmin, update);

function getAllAuthor(req, res) {
    authorController.getAllAuthor().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function getAuthorByID(req, res) {
    let _id = req.params.id;
    authorController.getAuthorByID(_id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function create(req, res) {
    let name = req.body.name;
    authorController.create(name).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function update(req, res) {
    let id = req.params.id;
    let name = req.body.name;
    authorController.updateAuthorByID(id, name).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
export default authorRouter;