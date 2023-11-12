const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
      async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
    
        res.json(foundUser);
      },
    
      async createUser({ body }, res) {
        const user = await User.create(body);
    
        if (!user) {
          return res.status(400).json({ message: "Something is wrong!" });
        }
        const token = signToken(user);
        res.json({ token, user });
      },
    
      async login({ body }, res) {
        const user = await User.findOne({
          $or: [{ username: body.username }, { email: body.email }],
        });
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }
    
        const correctPass = await user.isCorrectPassword(body.password);
    
        if (!correctPass) {
          return res.status(400).json({ message: "Password is incorrect!" });
        }
        const token = signToken(user);
        res.json({ token, user });
      },
      
      async addDestination({ user, body }, res) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { destinations: body } },
            { new: true, runValidators: true }
          );
          return res.json(updatedUser);
        } catch (err) {
          console.error(err);
          return res.status(400).json(err);
        }
      },
    
      async deleteDestination({ user, params }, res) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { destinations: { destinationId: params.destinationId } } },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found or destination not found!" });
          }
          return res.json(updatedUser);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    };

    
    
    
    