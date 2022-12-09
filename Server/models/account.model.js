import Account from '../entities/account.entity.js';

/**
 * getAllAccount()
 * @returns {Promise<Account>}
 */
function getAllAccount() {
    return new Promise((res, rej) => {
        Account.find({})
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
/**
 * Save new account
 * @param {Account} newAccount - The new account
 * @returns {Promise<Account>}
 */
function save(newAccount) {      
    return new Promise((res, rej) => {
        newAccount.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}
/**
 * Get account by username
 * @param {string} username - The account's username
 * @returns {Promise<Account>}
 */
function getAccountByUsername(username) {
    let query = {username : username};
    return new Promise((res, rej) => {
        Account.findOne(query)
                .exec((err, account) => {
                    if (err) rej(err);
                    if (account) res(account);
                    res(null);
                })
    })
}

/**
 * Get account by email
 * @param {string} email - The account's email
 * @returns {Promise<Account>}
 */
function getAccountByEmail(email) {
    let query = {email : email};
    return new Promise((res, rej) => {
        Account.findOne(query)
                .exec((err, account) => {
                    if (err) rej(err);
                    if (account) res(account);
                    res(null);
                })
    })
}

/**
 * Get account by ID
 * @param {string} _id - The account's id
 * @returns {Promise<Account>}
 */
function getAccountByID(id) {
    let query = {_id : id};
    return new Promise((res, rej) => {
        Account.findById(query)
                .exec((err, account) => {
                    if (err) rej(err);
                    if (account) res(account);
                    res(null);
                })
    })
}

/**
 * Update password by account ID
 * @param {string} id - The acount's id
 * @returns {Promise<Account>}
 */
function updatePasswordByID(id, password){
    let query = { _id: id };
    let update = { password: password } 
    return new Promise((res, rej) => {
        Account.updateOne(query, update)
                .exec((err, result) => {
                    if (err) rej(err);
                    res(result);
                })
    })
}
export default {
    save, 
    getAccountByUsername, 
    getAllAccount,
    getAccountByEmail,
    getAccountByID,
    updatePasswordByID
};