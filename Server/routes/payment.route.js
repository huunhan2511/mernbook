import express from 'express';
import paymentController from '../controllers/payment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import orderController from '../controllers/order.controller.js';
const paymentRouter = express.Router();

paymentRouter.get('/vnpay_ipn', ipn);
paymentRouter.post('/re-payment', Repayment);

function ipn(req, res) {
    var vnp_Params = req.query;
    paymentController.ipn(vnp_Params).then((result) => {
        res.redirect('http://localhost:3000/')
    }).catch((error) => {
        res.status(402).json(error);
    })
}
function Repayment(req, res) {
    let bankCode = 'NCB';
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    let orderID = req.body.id
    orderController.getOrder(orderID).then((order) => {
        paymentController.create(order.Order._id, order.Order.grandTotal, ipAddr, bankCode).then((vnpUrl) => {
            res.send(vnpUrl);
        });
    }).catch((err) => {
        res.status(402).json(err);
    });
    
}
export default paymentRouter;