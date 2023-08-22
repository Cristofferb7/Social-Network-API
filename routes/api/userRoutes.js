const router = require("express").Router();
const  {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/userController");

// GET ALL USERS
router.get("/", getAllUsers)

// GET USER BY ID
router.get("/:id", getUserById)

// CREATE NEW USER
router.post("/", createUser)

// UPDATE USER BY ID
router.put("/:id", updateUser )

// DELETE USER BY ID
router.delete("/:id", deleteUser)

// ADD NEW FRIEND
router.post("/:userId/friends/:friendId", addFriend)

// DELETE FRIEND
router.delete("/:userId/friends/:friendId", deleteFriend)


module.exports = router;