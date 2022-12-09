import express from 'express';
import commentController from '../controllers/comment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const commentRouter = express.Router();

commentRouter.get('/', authMiddleware.isAdmin, getAllComment);
commentRouter.get('/:id', getCommentByProduct);
// commentRouter.get('/:id', getCommentByID);
commentRouter.post('/', authMiddleware.isAuth, create);

function getAllComment(req, res) {
    commentController.getAllComment().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.comment(402).json(err);
    });
}
function getCommentByProduct(req, res) {
    let product = req.params.id;
    commentController.getCommentByProduct(product).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.comment(402).json(err);
    });
}

function create(req, res) {
    let account = req.jwtDecoded._id;
    let {product ,context} = req.body;
    commentController.create(account, product, context).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.comment(402).json(err);
    });
}
export default commentRouter;