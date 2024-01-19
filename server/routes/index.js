const Router = require('express');
const router = new Router();

const categoriesRouter=require("./CategoriesRouter");
const articleRouter=require("./ArticleRouter");
const hastagRouter=require("./HashtagRouter");
const additionalPagesRouter=require("./AdditionalPagesRouter")
const musicRouter=require("./MusicRouter");
const podcast=require("./Podcast");

router.use("/categories",categoriesRouter);
router.use("/article",articleRouter);
router.use("/hashtag",hastagRouter);
router.use("/additionalPages",additionalPagesRouter);
router.use("/music",musicRouter);
router.use("/podcast",podcast);

module.exports = router;