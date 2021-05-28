const express = require("express");
const router = express.Router();

const {
	signupAdmin,
	signup,
	signin,
	forgot1, // Recovery By security Questions
	forgot2, // Recovery By generated Unique ID
	signout,
	requireSignin,
	forgotPassword,
	resetPassword, // MAIN Recovery ( email )
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signup/admin/dlvladmin", signupAdmin);
router.post("/signin", signin);
router.post("/forgot1", forgot1); // alternative step for password recovery by Questions
router.post("/forgot2", forgot2); // alternative step for password recovery by ID
router.post("/forgotPassword", forgotPassword);  // Main step for password recovery
router.put("/forgot/reset/:token", resetPassword) // for Email Recovery
router.get("/signout", signout);

router.get("/hello", requireSignin, (req, res) => {
	res.send("hello");
});

module.exports = router;
