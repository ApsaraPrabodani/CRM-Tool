const { USER_GROUP} = require('../constants/common.contant');

let user = async function(req, res, next) {
    req.user = {
        user_group_id: Number(USER_GROUP.ADMIN.id),
    };
    res.set(req.user);
    next();
};
module.exports.user = user;
