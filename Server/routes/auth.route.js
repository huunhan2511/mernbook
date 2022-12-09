import express from 'express';
import authController from '../controllers/auth.controller.js';
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/reset-password', resetPassword);

function login(req, res) {
    let { username, password } = req.body;
    authController.login(username, password).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function register(req, res) {
    let { username, password, email } = req.body;
    authController.register(username, password, email).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function resetPassword(req, res) {
    let email = req.body.email;
    authController.resetPassword(email).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

export default userRouter;