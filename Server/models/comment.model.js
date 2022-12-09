import Comment from '../entities/comment.entity.js';

function getAllComment() {
    return new Promise((res, rej) => {
        Comment.find({},'_id comment')
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}

function getCommentByProduct(product) {
    let query = {product : product}
    return new Promise((res, rej) => {
        Comment.find(query,'-_id -product -updatedAt')
                .populate('account','-_id username')
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
function getCommentByAccount(_id) {
    let query = {account : _id}
    return new Promise((res, rej) => {
        Comment.findOne(query,'_id comment')
                .exec((err, data) => {
                    if (err) rej(err)
                    res(data)
            })
    })
}
function save(newComment) {      
    return new Promise((res, rej) => {
        newComment.save((err, data) => {
                    if (err) rej(err);
                    res(data);
            })
    })
}

export default {
    // CRUD
    getAllComment,
    getCommentByProduct,
    getCommentByAccount,
    save,   
}