import commentModel from '../models/comment.model.js';
import Comment from '../entities/comment.entity.js';
import errorMessage from '../helpers/error.message.helper.js';

function getAllComment() {
    try {
      return commentModel.getAllComment();
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function getCommentByProduct(product) {
    try {
        let comment = await commentModel.getCommentByProduct(product);
        return comment;
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function getCommentByAccount(_id) {
    try {
        let comment = await commentModel.getCommentByAccount(_id);
        return comment;
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function create(account, product, context) {
    try {
      let newComment = new Comment({
        account : account,
        product : product,
        context : context
      });
      let err = newComment.validateSync();
      if (err) return errorMessage(err);
      await commentModel.save(newComment);
      return {Message : 'Bình luận thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

export default {
    getAllComment,
    getCommentByProduct,
    getCommentByAccount,
    create,
};