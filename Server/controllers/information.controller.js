import informationModel from '../models/Information.model.js';
import Information from '../entities/information.entity.js';
import errorMessage from '../helpers/error.message.helper.js';

async function getInformationByID(_id) {
  try { 
    return await informationModel.getInformationByID(_id);
  }
  catch (err) {
    return errorMessage(err);
  }
};


async function updateInformationByID(_id, fullname, phone, address) {
  try {
    let currentInformation = await informationModel.getInformationByID(_id);
    currentInformation.fullname = fullname;
    currentInformation.phone = phone;
    currentInformation.address = address;
    let err = currentInformation.validateSync();
    if (err) return errorMessage(err);
    await informationModel.update(_id, fullname, phone, address);
    return {Message : 'Cập nhật thông tin thành công'};
  }
  catch (err) {
    return errorMessage(err);
  }
};

export default {
  updateInformationByID,
  getInformationByID
};