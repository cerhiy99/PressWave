const Router = require('express');
const router = new Router();

const categoriesRouter=require("./CategoriesRouter");
const articleRouter=require("./ArticleRouter");
const hastagRouter=require("./HashtagRouter");
const additionalPagesRouter=require("./AdditionalPagesRouter")

router.use("/categories",categoriesRouter);
router.use("/article",articleRouter);
router.use("/hashtag",hastagRouter);
router.use("/additionalPages",additionalPagesRouter);

module.exports = router;