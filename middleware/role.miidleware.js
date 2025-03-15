const { responseForbiddenError } = require('../services/util.service');

// middleware for doing role-based permissions
module.exports = function role(...permittedRoles) {
    // return a middleware
    //HERE req.user should have user_group_id which assigned to them
    return (req, res, next) => {
        if (
            req.user &&
      permittedRoles.includes(parseInt(req.user.user_group_id))
        ) {
            next();
        } else {
            return responseForbiddenError(res);
        }
    };
};
