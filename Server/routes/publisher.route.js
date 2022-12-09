import express from 'express';
import publisherController from '../controllers/publisher.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const publisherRouter = express.Router();

publisherRouter.get('/', getAllPublisher);
publisherRouter.get('/:id', authMiddleware.isAdmin, getPublisherByID);
publisherRouter.post('/', authMiddleware.isAdmin, create);
publisherRouter.patch('/:id', authMiddleware.isAdmin, update);

function getAllPublisher(req, res) {
    publisherController.getAllPublisher().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function getPublisherByID(req, res) {
    let _id = req.params.id;
    publisherController.getPublisherByID(_id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function create(req, res) {
    let name = req.body.name;
    publisherController.create(name).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function update(req, res) {
    let id = req.params.id;
    let name = req.body.name;
    publisherController.updatePublisherByID(id, name).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
export default publisherRouter;