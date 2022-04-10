const router = require("express").Router();
const { addUser,viewUser,viewEachUser,deleteUser } = require("../Controllers/userController");


router.post("/add",addUser);
router.get("/view",viewUser);
router.get("/view/:id",viewEachUser);
router.delete("/delete/:id",deleteUser);


module.exports = router;