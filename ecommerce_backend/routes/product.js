const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
	create,
	productById,
	read,
	remove,
	update,
	list,
	listRelated,
	listCategories,
	listBySearch,
	photoOne,
	photoTwo,
	photoThree,
	listSearch,
	getGenderValues
} = require("../controllers/product");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);
router.param("userId", userById);
router.param("productId", productById);
router.delete(
	"/product/:productId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	remove
);
router.put(
	"/product/:productId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	update
);
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/products/gender", getGenderValues)
router.get("/product/photo_1/:productId", photoOne);
router.get("/product/photo_2/:productId", photoTwo);
router.get("/product/photo_3/:productId", photoThree);
router.get("/products/search", listSearch);

module.exports = router;
