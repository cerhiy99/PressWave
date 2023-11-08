const Router = require('express');
const router = new Router();

const categoriesRouter=require("./CategoriesRouter");

router.use("/categories",categoriesRouter);

module.exports = router;