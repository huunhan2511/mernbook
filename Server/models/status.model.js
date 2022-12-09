import Status from '../entities/status.entity.js';

function getAllStatus() {
    return new Promise((res, rej) => {
        Status.find({},'_id status')
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
function getStatusByID(_id) {
    let query = {_id : _id}
    return new Promise((res, rej) => {
        Status.findOne(query,'_id status')
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
 function save(newStatus) {      
    return new Promise((res, rej) => {
        newStatus.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}

function updateStatusByID(_id, status) {    
    let condition = {_id : _id};
    let update = {status : status};
    return new Promise((res, rej) => {
        Status.updateOne(condition, update)
                .exec((err, Status) => {
                    if (err) rej(err);
                    if (Status) res(Status);
                })
    })
}

export default {
    // CRUD
    getAllStatus,
    getStatusByID,
    save,
    updateStatusByID,    
}