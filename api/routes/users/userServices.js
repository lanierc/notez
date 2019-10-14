const { model: User } = require("./userModel");

exports.createUser = async userData => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (e) {
    throw e;
  }
};

exports.isUser = async ({ email, password }) => {
  try {
    const [user] = await User.find({ email });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return user;
      }
    }
  } catch (e) {
    throw e;
  }
};

exports.getUserById = async id => {
  try {
    const user = await User.findById(id)
      .populate({ path: "gameNotes", populate: { path: "filter" } })
      .populate({ path: "playerNotes", populate: { path: "filter" } });
    if (user) {
      return user;
    }
  } catch (e) {
    throw e;
  }
};
