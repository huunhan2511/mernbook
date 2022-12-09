import statusModel from '../models/status.model.js';
import Status from '../entities/status.entity.js';
import errorMessage from '../helpers/error.message.helper.js';

function getAllStatus() {
    try {
      return statusModel.getAllStatus();
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function getStatusByID(_id) {
    try {
        let status = await statusModel.getStatusByID(_id);
        if (!status) return {Message : 'Trạng thái không tồn tại'};
        return status;
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function create(_id, status) {
    try {
      let newStatus = new Status({
        _id : _id,
        status : status
      });
      let err = newStatus.validateSync();
      if (err) return errorMessage(err);
      await statusModel.save(newStatus);
      return {Message : 'Tạo trạng thái thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

async function updateStatusByID(_id,status) {
    try {
        await statusModel.updateStatusByID(_id, status);
        return {Message : 'Cập nhật trạng thái thành công'};
    }
    catch (err) {
      return errorMessage(err);
    }
};

export default {
    getAllStatus,
    getStatusByID,
    create,
    updateStatusByID,
};