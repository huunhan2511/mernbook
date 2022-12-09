import orderModel from '../models/order.model.js'
import orderDetailModel from '../models/orderDetail.model.js'
import Order from '../entities/order.entity.js'
import orderDetail from '../entities/orderDetail.entity.js'
import errorMessage from '../helpers/error.message.helper.js';
import productModel from '../models/product.model.js'
import voucherController from '../controllers/voucher.controller.js';
import statusController from '../controllers/status.controller.js';

function getAllOrders(){
    try{
        return orderModel.getAllOrders();
    } catch (err){
        return errorMessage(err)
    }
}
async function createOrder(account, customer, phone, address, totalPrice, shipping, voucher, grandTotal, paymentMethod, cancelReason, note, cart){
    try {
        let newOrder = new Order({
            "account": account,
            "customer": customer,
            "phone": phone,
            "address": address,
            "totalPrice": totalPrice,
            "shipping": shipping,
            "grandTotal": grandTotal,
            "paymentMethod": paymentMethod,
            "status": 1,
            "cancelReason": cancelReason,
            "note": note,
        })
        /**
        * ORDER VALIDATION :
        * - @PRODUCT CART QUANTITY.
        * - @VOUCHER USE.
        * - @ORDER FORMAT.
        */
        // PRODUCT QUANTITY
        cart.forEach(async (item) => {
            let product = await productModel.getProductByID(item._id);
            if (item.quantity > product.stock) {
                return { Message: 'Số lượng sản phẩm đã thay đổi' };
            }
        })
        // VOUCHER USE
        if (voucher) {
            let Voucher = await voucherController.isAvailable(voucher, account);
            if (!Voucher.isAvailable) {
                return { Message: Voucher.Message }
            };
            newOrder.voucher = Voucher.id;
        }

        // ORDER FORMAT
        let err = newOrder.validateSync();
        if (err) return errorMessage(err);
        /**
        * ORDERING PROGRESSION :
        * - CREATE NEW @ORDER
        * - APPLY @VOUCHER
        * - CREATE @ORDER_DETAIL
        * - DECREASE @PRODUCT QUANTITY
        */
        // CREATE NEW ORDER
        let order = await orderModel.createOrder(newOrder);
        // DECREASE PRODUCT QUANTITY
        cart.forEach(async (item) => {
            let product = await productModel.getProductByID(item._id);
            let remain = (product.stock - item.quantity);
            let update = { stock: remain };
            await productModel.updateProduct(item._id, update);
        })
        // APPLY VOUCHER
        if (order.voucher) {
            await voucherController.apply(account, order.voucher);
        }
        //CREATE ORDER DETAIL
        let newOrderDetail = new orderDetail({
            "order_id": order._id,
            "products": cart
        })
        await orderDetailModel.saveOrderDetail(newOrderDetail)
        return {
            OrderID: order._id,
            Message: 'Đặt hàng thành công'
        };
    } catch (err) {
        return errorMessage(err)
    }
}

async function getOrder(id){
    try {
        let order = await orderModel.getOrder(id);
        let orderDetail = await orderDetailModel.getOrderDetail(id);
        let res = { Order: order, OrderDetail: orderDetail }
        return res;
    } catch (err) {
        return errorMessage(err);
    }

    try{
        let order = await orderModel.getOrder(id);
        let orderDetail = await orderDetailModel.getOrderDetail(id);      
        let res = { Order : order , OrderDetail : orderDetail }
        return res;
    } catch (err){
        return errorMessage(err);
    }
}

function gt(a,b){
    if (a > b) return true;
    return false;

    if(a>b) return true;
    return false;
}
function eq(a,b){
    if (a == b) return true;
    return false;

    if(a==b) return true;
    return false;
}

async function updateOrder(id, update){
    try {
        let order = await orderModel.getOrder(id);
        let status = order.status._id;
        switch (status) {
            case 1:
                if (eq(status, update.status)) return { Message: 'Không thể cập nhật trùng trạng thái' };
                break;
            case 2:
                if (eq(status, update.status)) return { Message: 'Không thể cập nhật trùng trạng thái' };
                if (gt(status, update.status)) return { Message: 'Cập nhật trạng thái không hợp lệ' };
                break;
            case 3:
                if (eq(status, update.status)) return { Message: 'Không thể cập nhật trùng trạng thái' };
                if (update.status == 5) return { Message: 'Đơn hàng đang vận chuyển, không thể hủy' };
                if (gt(status, update.status)) return { Message: 'Cập nhật trạng thái không hợp lệ' };
                break;
            case 4:
                return { Message: 'Không thể cập nhật đơn hàng đã hoàn tất' };
                break;
            case 5:
                return { Message: 'Không thể cập nhật đơn hàng đã hủy' };
                break;
            default:
                break;
        }
        if (update.status == 5) {
            let cancelProducts = await orderDetailModel.getOrderDetail(id);
            cancelProducts = cancelProducts.products;
            cancelProducts.forEach(async (item) => {
                let product = await productModel.getProductByID(item._id);
                let remain = (product.stock + item.quantity);
                let update = { stock: remain };
                await productModel.updateProduct(item._id, update);
            })
        }
        // CANCEL OREDER, INCREASE PRODUCT QUANTITY   
        await orderModel.updateOrder(id, update);
        return { Message: 'Cập nhật đơn hàng thành công' };
    } catch (err) {
        return errorMessage(err)
    }

    try{
        let order = await orderModel.getOrder(id);
        let status = order.status._id;
        switch(status) {
            case 1 :
                if(eq(status, update.status)) return {Message : 'Không thể cập nhật trùng trạng thái'};
                break;
            case 2 :
                if(eq(status, update.status)) return {Message : 'Không thể cập nhật trùng trạng thái'};
                if (gt(status, update.status)) return {Message : 'Cập nhật trạng thái không hợp lệ'};
                break;
            case 3:
                if(eq(status, update.status)) return {Message : 'Không thể cập nhật trùng trạng thái'};
                if (update.status==5) return {Message : 'Đơn hàng đang vận chuyển, không thể hủy'};
                if (gt(status, update.status)) return {Message : 'Cập nhật trạng thái không hợp lệ'};
                break;
            case 4:
                return {Message : 'Không thể cập nhật đơn hàng đã hoàn tất'};
                break;
            case 5:
                return {Message : 'Không thể cập nhật đơn hàng đã hủy'};
                break;
            default:
                break;
        }
        if(update.status==5){
            let cancelProducts = await orderDetailModel.getOrderDetail(id);
            cancelProducts = cancelProducts.products;
            cancelProducts.forEach(async(item) => {
            let product = await productModel.getProductByID(item._id);
            let remain = (product.stock + item.quantity);
            let update = {stock: remain};
            await productModel.updateProduct(item._id, update);
            }) 
        }
        // CANCEL OREDER, INCREASE PRODUCT QUANTITY   
        await orderModel.updateOrder(id, update);
        return {Message : 'Cập nhật đơn hàng thành công'};
    } catch (err){
        return errorMessage(err)
    }
}
// async function countOrdersByStatus(status){
//     try{
//         return await orderModel.countOrdersByStatus(status);
//     } catch (err){
//         return err
//     }
// }

async function getOrdersByStatus(status){
    try {
        return await orderModel.getOrdersByStatus(status);
    } catch (err) {
        return err;
    }
}

async function getOrdersByAccountID(id){
    try {
        return await orderModel.getOrdersByAccountID(id);
    } catch (error) {
        return err;
    }
}
async function getOrderByAccountID(id,orderID){
    try {
        return await orderModel.getOrderByAccountID(id,orderID);
    } catch (error) {
        return err;
    }
}

async function countOrdersByYear(year) {
    try {
        var status = await statusController.getAllStatus()
        return status.map(async (item) => {
            var orders = await orderModel.countOrdersByYear(year, item._id)            
            return orders
        })
    } catch (err) {
        return err
    }
}

async function turnoverByYear(year) {
    try {
        var monthsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        let start, end
        return monthsArray.map(async (item) => {
            if (item < 9) {
                start = String(year + '-0' + item)
                end = String(year + '-0' + (item + 1))
                var turnover = await orderModel.turnoverByYear(start, end, 4)
                return turnover
            }
            else if (item == 9) {
                start = String(year + '-0' + item)
                end = String(year + '-' + (item + 1))
                var turnover = await orderModel.turnoverByYear(start, end, 4)
                return turnover
            } 
            else if (item < 12) {
                start = String(year + '-' + item)
                end = String(year + '-' + (item + 1))
                var turnover = await orderModel.turnoverByYear(start, end, 4)
                return turnover
            }
            else {
                start = String(year + '-' + item)
                end = String((Number(year) + 1) + '-' + (item - 11))
                var turnover = await orderModel.turnoverByYear(start, end, 4)
                return turnover
            }
        })
        //return await orderModel.turnoverByYear();
    } catch (err) {
        return err
    }
}

export default {
    createOrder,
    getAllOrders,
    updateOrder,
    getOrder,
    getOrdersByStatus,
    getOrdersByAccountID,
    getOrderByAccountID,
    countOrdersByYear,
    turnoverByYear,
}