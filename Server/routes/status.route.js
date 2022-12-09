import express from 'express';
import statusController from '../controllers/status.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const statusRouter = express.Router();

statusRouter.get('/', authMiddleware.isAdmin, getAllStatus);
statusRouter.get('/:id', authMiddleware.isAdmin, getStatusByID);
statusRouter.post('/', authMiddleware.isAdmin, create);
statusRouter.patch('/:id', authMiddleware.isAdmin, update);

function getAllStatus(req, res) {
    statusController.getAllStatus().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function getStatusByID(req, res) {
    let _id = req.params.id;
    statusController.getStatusByID(_id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function create(req, res) {
    let {_id, status} = req.body;
    statusController.create(_id, status).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function update(req, res) {
    let id = req.params.id;
    let status = req.body.status;
    statusController.updateStatusByID(id, status).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
export default statusRouter;