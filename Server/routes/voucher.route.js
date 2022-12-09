import express from 'express';
import voucherController from '../controllers/voucher.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const voucherRouter = express.Router();

voucherRouter.get('/apply/:code', authMiddleware.isAuth, applyVoucher);
voucherRouter.get('/', authMiddleware.isAdmin, getAllVoucher);
voucherRouter.get('/:code', authMiddleware.isAdmin, getVoucherByCode);
voucherRouter.post('/', authMiddleware.isAdmin, create);
voucherRouter.patch('/:id', authMiddleware.isAdmin, update);


function create(req, res) {
    let { code, discount, quantity, description } = req.body;
    voucherController.create(code, discount, quantity, description).then((result) => {
        res.json(result);
    }).catch((err) => {

        res.status(402).json(err);
    });
}

function getAllVoucher(req, res) {
    voucherController.getAllVoucher().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function getVoucherByCode(req, res) {
    let code = req.params.code;
    voucherController.getVoucherByCode(code).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(402).json(err);
    });
}

function applyVoucher(req, res){
    let _id = req.jwtDecoded._id;
    let code = req.params.code;
    voucherController.isAvailable(code, _id).then((result) =>{
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}
function update(req, res){
    let id = req.params.id;
    let {code, discount, quantity, description} = req.body;
    voucherController.update(id, code, discount, quantity, description).then((result) =>{
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}
export default voucherRouter;