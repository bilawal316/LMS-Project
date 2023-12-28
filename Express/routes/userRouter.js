const userController = require("../controllers/userController");
const { trainee, instructor, admin } = require("../middleware");
const router = require("express").Router();


router.post("/createUser", userController.createUser);
router.get("/getAllUsers", trainee, userController.getAllUser);
router.get("/getAllInstructor", userController.getAllInstructor);
router.delete("/deleteUser", instructor, userController.deleteUser);
router.put("/updateUser", admin, userController.updateUser);
router.post("/onbaording",  userController.onBoarding);


module.exports = router;