const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');

const getuserProfileById = async (id) => {
    const result = await Test.findById(id);
    if (!result) {
        return { error: 'Test not found' };
    }
    return result;
};

module.exports = {
    getuserProfileById
}