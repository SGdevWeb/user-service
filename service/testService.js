const User = require('../model/userModel');

const getLastnameFromFirstname = async (name)=> {
    const resultuser = []
    await User.find({firstname: name}).then(data => {
        data.forEach((user) =>{
            resultuser.push(user.lastname);
        })
    });
    return resultuser;
};

module.exports = {
    getLastnameFromFirstname
}