import express from 'express';
import accountController from '../controllers/account.controller.js';
import informationController from '../controllers/information.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import orderController from '../controllers/order.controller.js';
const accountRouter = express.Router();

//Accounts
accountRouter.patch('/change-password', authMiddleware.isAuth, changePassword);

//Informations
accountRouter.get('/information', authMiddleware.isAuth, getInformation);
accountRouter.patch('/information', authMiddleware.isAuth, updateInformation);

//Orders
accountRouter.get('/orders', authMiddleware.isAuth, getOrdersByAccountID)
accountRouter.get('/orders/:id', authMiddleware.isAuth, getOrderByAccountID)
accountRouter.patch('/orders/:id', authMiddleware.isAuth, update);

//Admin role required
accountRouter.get('/', authMiddleware.isAdmin, getAllAccount);

function getAllAccount(req, res) {
    accountController.getAllAccount().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function changePassword(req, res) {
    let _id = req.jwtDecoded._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    accountController.changePassword(_id, oldPassword, newPassword).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function updateInformation(req, res) {
    let _id = req.jwtDecoded._id;
    let {fullname, phone, address} = req.body;
    informationController.updateInformationByID(_id, fullname, phone, address).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function getInformation(req, res) {
    let _id = req.jwtDecoded._id;
    informationController.getInformationByID(_id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function update(req, res) {
    let id = req.params.id;
    orderController.updateOrder(id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}
function getOrdersByAccountID(req, res) {
    let accountID = req.jwtDecoded._id;
    orderController.getOrdersByAccountID(accountID).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.status(402).json(err)
    })
}
function getOrderByAccountID(req, res) {
    let accountID = req.jwtDecoded._id;
    let orderID = req.params.id;
    orderController.getOrderByAccountID(accountID,orderID).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.status(402).json(err)
    })
}
export default accountRouter;