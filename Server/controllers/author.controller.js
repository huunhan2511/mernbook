import authorModel from '../models/author.model.js';
import Author from '../entities/author.entity.js';
import errorMessage from '../helpers/error.message.helper.js';
function getAllAuthor() {
    try {
      return authorModel.getAllAuthor();
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function getAuthorByID(_id) {
    try {
        let author = await authorModel.getAuthorByID(_id);
        if (!author) return {Message : 'Tác giá không tồn tại'};
        return author;
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function create(name) {
    try {
      let newAuthor = new Author({
        name : name
      });
      let err = newAuthor.validateSync();
      if (err) return errorMessage(err);
      let res = await authorModel.save(newAuthor);
      return {Message : 'Tạo tác giả thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function updateAuthorByID(_id,name) {
    try {
        await authorModel.updateAuthorByID(_id, name);
        return {Message : 'Cập nhật tác giả thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

export default {
    getAllAuthor,
    getAuthorByID,
    create,
    updateAuthorByID,
};