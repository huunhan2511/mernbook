import Admin from '../entities/admin.entity.js';

/**
 * getAllAdmin()
 * @returns {Promise<Admin>}
 */
 function getAllAdmin() {
    return new Promise((res, rej) => {
        Admin.find({})
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
/**
 * Save new admin
 * @param {Admin} newAdmin - The new admin
 * @returns {Promise<Admin>}
 */
function save(newAdmin) {      
    return new Promise((res, rej) => {
        newAdmin.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}
/**
 * Get admin by username
 * @param {string} username - The admin's username
 * @returns {Promise<Admin>}
 */
function getAdminByUsername(username) {
    let query = {username : username};
    return new Promise((res, rej) => {
        Admin.findOne(query)
                .exec((err, admin) => {
                    if (err) rej(err);
                    if (admin) res(admin);
                    res(null);
                })
    })
}
/**
 * Get admin by id
 * @param {string} username - The admin's id
 * @returns {Promise<Admin>}
 */
 function getAdminByID(id) {
    let query = {_id : id};
    return new Promise((res, rej) => {
        Admin.findOne(query)
                .exec((err, admin) => {
                    if (err) rej(err);
                    if (admin) res(admin);
                    res(null);
                })
    })
}
/**
 * Update password by admin ID
 * @param {string} id - The acount's id
 * @returns {Promise<Admin>}
 */
function updatePasswordByID(id, password){
    let query = { _id: id };
    let update = { password: password } 
    return new Promise((res, rej) => {
        Admin.updateOne(query, update)
                .exec((err, result) => {
                    if (err) rej(err);
                    res(result);
                })
    })
}
export default {
    save, 
    getAdminByUsername, 
    updatePasswordByID,
    getAllAdmin,
    getAdminByID
};