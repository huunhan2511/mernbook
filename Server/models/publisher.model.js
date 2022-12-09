import Publisher from '../entities/publisher.entity.js';

function getAllPublisher() {
    return new Promise((res, rej) => {
        Publisher.find({},'_id name')
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
function getPublisherByID(_id) {
    let query = {_id : _id}
    return new Promise((res, rej) => {
        Publisher.findOne(query,'_id name')
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
 function save(newPublisher) {      
    return new Promise((res, rej) => {
        newPublisher.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}

function updatePublisherByID(_id, name) {    
    let condition = {_id : _id};
    let update = {name : name};
    return new Promise((res, rej) => {
        Publisher.updateOne(condition, update)
                .exec((err, Publisher) => {
                    if (err) rej(err);
                    if (Publisher) res(Publisher);
                })
    })
}

export default {
    // CRUD
    getAllPublisher,
    getPublisherByID,
    save,
    updatePublisherByID,    
}