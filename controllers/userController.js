const {User, Thought} = require("../models")

const getAllUsers = (req, res) => {
    User.find()
    .populate("friends")
    .then(results => {
     res.json(results)
     
    })
 }

 const getUserById =  (req, res) => {
    User.findById(req.params.id)
    .populate("friends")
    .then(results => {
     res.json(results)
    })
 }


const createUser = (req, res) => {
    User.create(req.body)
    .then(results => {
        res.json(results)
       })
}

const updateUser = (req, res) => { 
    User.findByIdAndUpdate(
        req.params.id,
        {
            username: req.body.username,
            email: req.body.email
        }
    ).then(results => {
        res.json(results)
       })
}

const deleteUser = (req, res) => { 
    User.findByIdAndDelete(req.params.id)
    .then(results => {
        res.json(results)
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
    ) .then(results => {
        res.json(results)
       })
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