const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
	create,
	collectionById,
	read,
	update,
	remove,
	list,
	collectionImage,
	photo,
	listRelated,
	collectionImageUpdate
} = require("../controllers/collection");
const { userById } = require("../controllers/user");

router.post("/collection/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post("/collection/upload/:userId/:collectionId", requireSignin, isAuth, isAdmin, collectionImage)
router.put("/collection/upload/:userId/:collectionId", requireSignin, isAuth, isAdmin, collectionImageUpdate)
router.put(
	"/collection/:collectionId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	update
);
router.delete(
	"/collection/:collectionId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	remove
);
router.get("/collection/:collectionId", read);
router.get("/collections", list);

router.get("/collection/photo/:collectionId", photo);

router.get("/collection/products/:collectionId", listRelated)

router.param("userId", userById);
router.param("collectionId", collectionById);

module.exports = router;
