const { validationResult } = require('express-validator');
const userService = require('../service/userService');

const userProfileGetController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await userService.getuserProfileById(req.params.id);
        if (user.error) {
            return res.status(404).json({ error: user.error });
        }
        return res.status(200).json({});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    userProfileGetController,
}