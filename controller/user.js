const { UserService } = require("../services");

module.exports.getProfile = (res, req, next) => {
  try {
    const user = UserService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.editProfile = (res, req, next) => {
  try {
    const user = UserService.editProfile(req.user.id, req);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.addSchedule = (res, req, next) => {
  
};