const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');

const postOneExperience = async (data) => {
    const {experience} = data;
    const {uuid_user} = data;

    const userData = await User.findOne({uuid : uuid_user}).populate('profile');
    const userProfile = userData.profile;
    if(userProfile){
        experience[0].uuid = uuidv4();
        userProfile.experience.push(experience[0]);
        await userProfile.save(function (err,doc){
            if(err){
                return err
            }
        });
        return {"succes":'experience added in user_profile of specified user '}
    } else {
        return {"error":"can't find profile of specified user"}
    }
}

const updateOneExperience = async (data) => {
    const {experience} = data;
    const {uuid_user} = data;

    const userData = await User.findOne({uuid : uuid_user}).populate('profile');
    const userProfile = userData.profile;
    if(userProfile){
        const found = userProfile.experience.findIndex(e => e.uuid === experience[0].uuid);
        if(found >=0){
            userProfile.experience[found] = experience[0];
            await userProfile.save(function (err,doc){
                if(err){
                    return err
                }
            });
        } else {
            return {"error":"can't find specified experience in user_profil of specified user"}
        }
        
        return {"succes":'specified experience updated in user_profile of specified user '}
    } else {
        return {"error":"can't find profile of specified user"}
    }
}

module.exports = {
    postOneExperience,
    updateOneExperience,
}