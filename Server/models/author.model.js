import Author from '../entities/author.entity.js';

function getAllAuthor() {
    return new Promise((res, rej) => {
        Author.find({},'_id name')
                .exec((err, data) => {
                    if (err) rej(err)
                    if (data) res(data)
                    res(null)
            })
    })
}
function getAuthorByID(_id) {
    let query = {_id : _id}
    return new Promise((res, rej) => {
        Author.findOne(query,'_id name')
                .exec((err, author) => {
                    if (err) rej(err)
                    if (author) res(author)
                    res(null)
            })
    })
}
 function save(newAuthor) {      
    return new Promise((res, rej) => {
        newAuthor.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}

function updateAuthorByID(_id, name) {    
    let condition = {_id : _id};
    let update = {name : name};
    return new Promise((res, rej) => {
        Author.updateOne(condition, update)
                .exec((err, result) => {
                    if (err) rej(err);
                    if (result) res(result);
                })
    })
}

export default {
    // CRUD
    getAllAuthor,
    getAuthorByID,
    save,
    updateAuthorByID,    
}