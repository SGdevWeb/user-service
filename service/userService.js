const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');

const getuserProfileById = async (uuid) => {
    const result = await UserProfile.findOne({ uuid });
    if (!result) {
        return { error: 'user not found' };
    }
    return result;
};

module.exports = {
    getuserProfileById,
}