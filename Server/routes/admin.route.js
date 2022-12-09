import express from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const adminRouter = express.Router();

adminRouter.get('/', authMiddleware.isAdmin, getAllAdmin);
adminRouter.post('/login', login);
adminRouter.post('/register', register);

function login(req, res) {
    let { username, password } = req.body;
    adminController.login(username, password).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function register(req, res) {
    let { username, password } = req.body;
    adminController.register(username, password).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function getAllAdmin(req, res) {
    adminController.getAllAdmin().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

export default adminRouter;