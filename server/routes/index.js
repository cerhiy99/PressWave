const Router = require('express');
const router = new Router();

const categoriesRouter=require("./CategoriesRouter");
const articleRouter=require("./ArticleRouter");

router.use("/categories",categoriesRouter);
router.use("/article",articleRouter);

module.exports = router;