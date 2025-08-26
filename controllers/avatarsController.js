const avatarsModel = require('../models/avatarsModel');

exports.getAvatars = (req, res) => {
  const avatars = avatarsModel.getAllAvatars(req);
  res.json(avatars);
};