const {User, Thought} = require("../models")

const getAllUsers = (req, res) => {
    User.find()
    .populate("friends")
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
}


 const getUserById =  (req, res) => {
    User.findById(req.params.id)
    .populate("friends")
    .then((user) =>
        !user
          ? res.status(404).json({ message: "No User find with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
 }


const createUser = (req, res) => {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

const updateUser = (req, res) => { 
    User.findByIdAndUpdate(
        req.params.id,
        {
            username: req.body.username,
            email: req.body.email
        }
    ).then((user) =>
    !user
      ? res.status(404).json({ message: "No User find with this ID!" })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err))
}

const deleteUser = (req, res) => { 
    User.findByIdAndDelete(req.params.id)
    .then(results => {
        res.json({message: "User deleted!"})
       })

}

const addFriend = (req, res) => {
    User.findByIdAndUpdate(
        req.params.userId,
        {
           $push: {
                friends: req.params.friendId
           }
        }
    ) .then(results => {
        res.json(results)
       })
}

const deleteFriend =  (req, res) => {
    User.findByIdAndUpdate(
        req.params.userId,
        {
           $pull: {
                friends: req.params.friendId
           }
        }
    ) .then((user) =>
    !user
      ? res.status(404).json({
          message: 'Error deleting friend',
        })
      : res.json({ message: 'successfully deleted!' })
  )
  .catch((err) => res.status(500).json(err));

}

module.exports =  {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
}