import express from 'express';
import orderController from '../controllers/order.controller.js';
import paymentController from '../controllers/payment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const orderRouter = express.Router();

//localhost:5000/orders path :id
orderRouter.get('/', authMiddleware.isAdmin, getAllOrder)
orderRouter.post('/', authMiddleware.isAuth, create)
orderRouter.get('/analytics', authMiddleware.isAdmin, countOrdersByYear)
orderRouter.get('/turnover', authMiddleware.isAdmin, turnoverByYear)
orderRouter.get('/:id', getOrder)
orderRouter.patch('/:id', authMiddleware.isAdmin,update)


function getAllOrder(req, res){   
    let status = req.query.status;
    if (status) {
        getOrdersByStatus(req, res, status);
    }
    else {
        orderController.getAllOrders().then((result)=>{
            res.json(result);
        }).catch((err)=>{
            res.status(402).json(err);
        });
    }
}

function getOrder(req, res){
    let id = req.params.id;
    orderController.getOrder(id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function create(req, res) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    let account = req.jwtDecoded._id;;
    let bankCode = req.body.bankCode;
    let {customer, phone, address, totalPrice, shipping, voucher, grandTotal, paymentMethod, cancelReason, note, cart} = req.body
    if (paymentMethod==='COD'){
        orderController.createOrder(account, customer, phone, address, totalPrice, shipping, voucher, grandTotal, paymentMethod, cancelReason, note, cart).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(402).json(err);
        });
    } else {
        orderController.createOrder(account, customer, phone, address, totalPrice, shipping, voucher, grandTotal, paymentMethod, cancelReason, note, cart).then((result) => {
            paymentController.create(result.OrderID, grandTotal, ipAddr, bankCode).then((vnpUrl) => {
                res.send(vnpUrl);
            });
        }).catch((err) => {
            res.status(402).json(err);
        });
    }
}

function update(req, res) {
    let id = req.params.id;
    orderController.updateOrder(id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function getOrdersByStatus(req, res, status){
    orderController.getOrdersByStatus(status).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function countOrdersByYear(req, res) {
    let year = req.query.year
    orderController.countOrdersByYear(year).then((data) => {
        Promise.all(data).then((result)=>{
            res.json(result);
        })
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function turnoverByYear(req, res) {
    let year = req.query.year
    orderController.turnoverByYear(year).then((data) => {
        Promise.all(data).then((result) => {
            res.json(result);
        })
    }).catch((err) => {
        res.status(402).json(err);
    });
}

export default orderRouter;