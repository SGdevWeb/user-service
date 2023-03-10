const service = require('../service/services');

const userProfileGetController = async (req, res) => {
    try {
        const user = await service.user.getUserProfileById(req.params.uuid);
        if (user.error) {
            return res.status(404).json({ error: user.error });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await service.user.updateProfile(req.body)
        if (!user) {
            throw new Error("Erreur impossible de mettre à jour le profile");
        }
        if (user.error) {
            throw new Error(user.error);
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const getAllProfileUsersController = async (req, res) => {
    try {
        const profile = await userServices.getAllProfileUsers();
        res.status(200).json({ profiles: profile })
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getUserController = async(req, res) => {
    // console.log('entra la peticion :', req.params.userId)
    try {
        const  uuid  = req.params.userId;
        // console.log(uuid);
        const user = await userServices.getUser(uuid);
    res.status(200).json({ users: user });
} catch (error) {
    res.status(500).json({ error });
}
}

module.exports = {
    getAllProfileUsersController,
    getUserController,
    userProfileGetController,
    updateUser
}
