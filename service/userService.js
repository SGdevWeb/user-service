const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const filterProfile = (user) => {
    const userfinal = {
        email : user.email,
        //password : user.password,
        firstname : user.firstname,
        lastname : user.lastname,
        username : user.username,
        description : user.profile.description,
        date_birth : user.profile.date_birth ? new Date(user.profile.date_birth).toLocaleDateString() : "",
        work : user.profile.work,
        experience : [],
        soft_skill : [],
    };
    user.profile.experience.forEach((experience) => {
        const exp = {
            name : experience.name,
            date_start : new Date(experience.date_start).toLocaleDateString(),
            date_end : experience.date_end ? new Date(experience.date_end).toLocaleDateString() : "",
            description : experience.description,
            place : experience.place,
            uuid : experience.uuid
        };
        userfinal.experience.push(exp);
    });
    user.profile.soft_skill.forEach((soft_skill) => {
        const sftskl = {
            name : soft_skill.name,
            description : soft_skill.description,
            uuid : soft_skill.uuid
        };
        userfinal.soft_skill.push(sftskl);
    });
    return userfinal;
}

const getUserProfileById = async (uuid) => {
    const result = await User.findOne({uuid : uuid }).populate('profile');
    if (!result) {
        return { error: 'user not found' };
    }
    return filterProfile(result);
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