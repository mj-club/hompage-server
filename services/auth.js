const { User } = require("../models");

module.exports.create = async (data) => {
  // password 암호화는 service에서
  const user = await User.create(data);
  return user;
};

// readByOption
module.exports.read = async (
  where,
  include = [],
  attributes = [],
  order = [[]]
) => {
  const user = await User.findOne(where, include, attributes, order);
  return user;
};

// readById
module.exports.readById = async (id) => {
  // password 암호화는 service에서
  const user = await User.findByPk(id);
  return user;
};

// readByModel
module.exports.join = () => {};

// readBy
module.exports.login = () => {};
