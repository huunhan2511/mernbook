import order from '../entities/order.entity.js';

function createOrder(newOrder){
    return new Promise((res, rej) => {
        newOrder.save((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}

function getAllOrders(){
    return new Promise((res, rej) => {
        order.find().exec(function(err, data){
            if (err) rej(err)
            res(data)
        })
    })
}

function getOrdersByStatus(status) {
    let condition = {status: status}
    return new Promise((res, rej) => {
        order.find(condition).exec(function(err, data){
            if (err) rej(err)
            res(data)
        })
    })
}

function getOrdersByAccountID(id) {
    let condition = {account: id}
    return new Promise((res, rej) => {
        order.find(condition).exec(function(err, data){
            if (err) rej(err)
            res(data)
        })
    })
}

function getOrderByAccountID(id, orderID) {
    let condition = {account: id, _id: orderID}
    return new Promise((res, rej) => {
        order.findOne(condition).exec(function(err, data){
            if (err) rej(err)
            res(data)
        })
    })
}

function countOrdersByYear(year, statusID) {
    let condition =
    {
        createdAt:
        {
            $gte: year,
            $lt: String(parseInt(year)+1),
        },
        status: statusID
    }
    return new Promise((res, rej) => {
        order.find(condition).exec(function (err, data) {
                            if (err) rej(err)
                            res(data.length)
                })
    })
}

function turnoverByYear(start, end, statusID) {
    let condition =
    {
        createdAt:
        {
            $gte: start,
            $lt: end,
        },
        status: statusID
    }
    return new Promise((res, rej) => {
        order.find(condition).exec(function (err, data) {
            if (err) rej(err)
            let total = 0
            data.forEach((item) => {
                total += item.totalPrice
            })
            res(total)
        })
    })
}

function getOrder(orderID){
    return new Promise((res, rej) => {
        order.findById(orderID)
        .populate('account', 'username')
        .populate('voucher', 'code discount')
        .populate('status', 'status')
        .exec(function(err, data){
            if (err) rej(err)
            res(data)
        })
    })
}

function updateOrder(id, update){
    return new Promise((res, rej) => {
        order.findByIdAndUpdate(id, update).exec((err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}


export default {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    getOrdersByStatus,
    getOrdersByAccountID,
    getOrderByAccountID,
    countOrdersByYear,
    turnoverByYear,
}