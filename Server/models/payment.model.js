import Payment from "../entities/payment.entity.js";

function getAllPayment() {
  return new Promise((res, rej) => {
      Payment.find({})
      .exec(function (err, data) {
            if (err) rej(err)
            res(data)
        })
  })
}

function save(newPayment){
  return new Promise((res, rej) => {
    newPayment.save((err, data) => {
        if (err) rej(err)
        res(data)
    })
})
}

export default {
    getAllPayment,
    save,
}