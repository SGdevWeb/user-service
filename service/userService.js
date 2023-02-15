const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');
const { populate } = require('../model/userModel');

const getuserProfileById = async (uuid) => {
    const result = await UserProfile.findOne({ uuid });
    if (!result) {
        return { error: 'user not found' };
    }
    return result;
};

const updateProfile = async (data) => {
    const userData = data.user
    const {uuid} = userData;
    const {username} = userData;
    const {avatar} = userData;

    const profileData = data.profile
    const {description} = profileData;
    const {work} = profileData;
    
    const userFullData = await User.findOne({uuid : uuid}).populate('profile');
    console.log(userFullData.profile);
}

module.exports = {
    getuserProfileById,
    updateProfile
}