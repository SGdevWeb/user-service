const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

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

    const res =''
    
    const userfullData = await User.findOne({uuid : uuid}).populate('profile');
    if(userfullData){
        userfullData.username = username;
        userfullData.avatar = avatar;
        userfullData.profile.description = description;
        userfullData.profile.work = work;
        await userfullData.save(function (err,doc){
            if(err){
                return err
            }
            //res += 'user updated';
        });
    } else {
        return {"error":"can't specified user"}
    }
    const userProfileFullData = userfullData.profile;
    if(userProfileFullData){
        userProfileFullData.description = description;
        userProfileFullData.work = work;
        await userProfileFullData.save(function (err,doc){
            if(err){
                return err
            }
            //res += ' , profile updated'
        });
    } else {
        return {"error":"can't find profile of specified user"}
    }
    return {"succes" : res};
}

module.exports = {
    getuserProfileById,
    updateProfile
}