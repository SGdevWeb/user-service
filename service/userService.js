const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const getUserProfileById = async (uuid) => {
    const result = await User.findOne({uuid : uuid }).populate('profile');
    if (!result) {
        return { error: 'user not found' };
    }
    return result;
};

const updateProfile = async (data) => {
    const {uuid,username,avatar} = data.user;
    const {description,work} = data.profile;

    const res = [];
    
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
        });
        res.push({"success":"specified user updated"});
    } else {
        return {"error":"can't find specified user"}
    }
    const userProfileFullData = userfullData.profile;
    if(userProfileFullData){
        userProfileFullData.description = description;
        userProfileFullData.work = work;
        await userProfileFullData.save(function (err,doc){
            if(err){
                return err
            }
        });
        res.push({"success" : "profile of user updated"})
    } else {
        return {"error":"can't find profile of specified user"}
    }
    return {"succes" : res};
};


module.exports = {
    getUserProfileById,
    updateProfile
}