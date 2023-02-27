const service = require('../service/services');

const userProfileGetController = async (req, res) => {
    try {
        const user = await service.user.getuserProfileById(req.params.uuid);
        if (user.error) {
            return res.status(404).json({ error: user.error });
        }
        return res.status(200).json({ city: user.city});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        return res.status(200).json({ result: await service.user.updateProfile(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    userProfileGetController,
    updateProfile,
}