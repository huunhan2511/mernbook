import orderDetail from "../entities/orderDetail.entity.js";

function getOrderDetail(orderID) {
  return new Promise((res, rej) => {
      orderDetail.findOne({order_id: orderID})
      .populate('products._id','-_id name')
      .exec(function (err, data) {
            if (err) rej(err)
            res(data)
        })
  })
}

function saveOrderDetail(newOrderDetail){
  return new Promise((res, rej) => {
    newOrderDetail.save((err, data) => {
        if (err) rej(err)
        res(data)
    })
})
}

export default {
    getOrderDetail,
    saveOrderDetail,
}
