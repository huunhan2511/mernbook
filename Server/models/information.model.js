import Information from '../entities/information.entity.js';

 function save(newInfo) {      
    return new Promise((res, rej) => {
        newInfo.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}
function update(_id, fullname, phone, address) {    
    let condition =  {_id : _id};
    let query = {fullname : fullname, phone: phone, address : address};
    return new Promise((res, rej) => {
        Information.updateOne(condition, query, (err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}
function getInformationByID(_id) {
    let query = {"_id": _id};
    return new Promise((res, rej) => {
        Information.findOne(query, '-_id fullname phone address')
                .exec((err, information) => {
                    if (err) rej(err);
                    if (information) res(information);
                })
    })
}
export default {
    //CRUD
    save, 
    update,
    getInformationByID
};