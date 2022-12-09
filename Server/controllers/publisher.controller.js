import publisherModel from '../models/publisher.model.js';
import Publisher from '../entities/publisher.entity.js';
import errorMessage from '../helpers/error.message.helper.js';

function getAllPublisher() {
    try {
      return publisherModel.getAllPublisher();
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function getPublisherByID(_id) {
    try {
        let publisher = await publisherModel.getPublisherByID(_id);
        if (!publisher) return {Message : 'Nhà cung cấp không tồn tại'};
        return publisher;
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function create(name) {
    try {
      let newPublisher = new Publisher({
        name : name
      });
      let err = newPublisher.validateSync();
      if (err) return errorMessage(err);
      await publisherModel.save(newPublisher);
      return {Message : 'Tạo nhà cung cấp thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function updatePublisherByID(_id,name) {
    try {
        await publisherModel.updatePublisherByID(_id, name);
        return {Message : 'Cập nhật nhà cung cấp thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

export default {
    getAllPublisher,
    getPublisherByID,
    create,
    updatePublisherByID,
};